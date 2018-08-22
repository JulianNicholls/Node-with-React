const sendgrid = require('sendgrid');
const { mail: helper } = sendgrid;

const { sendGridKey } = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgAPI = sendgrid(sendGridKey);

    this.from_email = new helper.Email(
      'no-reply@reallybigshoe.co.uk',
      'Really Big Shoe Marketing'
    );
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this._formatAddresses(recipients);

    this.addContent(this.body);
    this._addClickTracking();
    this._addRecipients();
  }

  async send() {
    const request = this.sgAPI.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    return await this.sgAPI.API(request);
  }

  _formatAddresses(recipients) {
    return recipients.map(({ email }) => new helper.Email(email));
  }

  _addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  _addRecipients() {
    const personalize = helper.Personalization();

    this.recipients.forEach(r => personalize.addTo(r));

    this.addPersonalization(personalize);
  }
}

module.exports = Mailer;
