const mongoose = require('mongoose');

const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/add_survey', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = await new Survey({
      title,
      subject,
      body,
      recipients: stringToRecipientArray(recipients),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Send the email(s)

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

  app.post('/api/set_credits', requireLogin, async (req, res) => {
    req.user.credits = Math.min(req.body.credits, req.user.credits);

    await req.user.save();

    res.send({ ok: true });
  });
};

const stringToRecipientArray = recipientStr => {
  // Split at , or ;, with optional whitespace
  return recipientStr.split(/[,;]\s*/).map(email => ({ email: email.trim() }));
};
