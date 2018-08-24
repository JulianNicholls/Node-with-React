const Path = require('path-parser').default;
const { URL } = require('url');
const _ = require('lodash');

const mongoose = require('mongoose');

const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/add_survey', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: stringToRecipientArray(recipients),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Send the email(s), save the survey, remove a credit, and return the user

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();

      await survey.save();

      --req.user.credits;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // Webhook post data
  // [ { ip: '31.53.89.199',
  //    sg_event_id: 'PVqzYv6NQOWyelVcSVsTdQ',
  //    sg_message_id: '0pg8JUwWTCCIAB2xaLdm7Q.filter0038p3las1-22314-5B7FB90E-12.0',
  //    useragent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36
  //                (KHTML, like Gecko) Ubuntu Chromium / 68.0.3440.106
  //                Chrome / 68.0.3440.106 Safari / 537.36',
  //    event: 'click',
  //    url_offset: { index: 0, type: 'html' },
  //    email: 'juliannicholls@gmail.com',
  //    timestamp: 1535097157,
  //    url: 'http://localhost:3000/api/surveys/thanks'
  // } ]

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log('Events:', req.body.length);

    const p = new Path('/api/surveys/:surveyID/:choice');

    // .value() not only returns the value, if any, but causes lodash to run
    // the chain
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);

        return match ? { ...match, email } : null;
      })
      .compact()
      .uniqBy('email', 'surveyID')
      .each(({ surveyID, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyID,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({ ok: 'true' });
  });

  app.get('/api/surveys/:surveyid/:choice', (req, res) => {
    res.send('<h3>Thanks for responding.</h3>');
  });
};

const stringToRecipientArray = recipientStr => {
  // Split at , or ;, with optional whitespace
  return recipientStr.split(/[,;]\s*/).map(email => ({ email: email.trim() }));
};
