const mongoose = require('mongoose');

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

    await survey.save();
  });

  app.post('/api/set_credits', requireLogin, async (req, res) => {
    req.user.credits = Math.min(req.body.credits, req.user.credits);

    await req.user.save();

    res.send({ ok: true });
  });
};

const stringToRecipientArray = recipientStr => {
  // Split at , or ;, with optional whitespace
  return recipientStr
    .split(/[,;]\s*/)
    .map(email => ({ email: email.trim() }));
};
