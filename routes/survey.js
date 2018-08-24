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
  
  // [ { ip: '31.53.89.199', 
  //    sg_event_id: 'PVqzYv6NQOWyelVcSVsTdQ',
  //    sg_message_id: '0pg8JUwWTCCIAB2xaLdm7Q.filter0038p3las1-22314-5B7FB90E-12.0',
  //    useragent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium / 68.0.3440.106 Chrome / 68.0.3440.106 Safari / 537.36',
  //    event: 'click',
  //    url_offset: { index: 0, type: 'html' }, 
  //    email: 'juliannicholls@gmail.com', 
  //    timestamp: 1535097157, 
  //    url: 'http://localhost:3000/api/surveys/thanks'
  // } ]
  
  app.post('/api/surveys/webhooks', (req, res) => {
    console.log(req.body);
    
    res.send({ ok: true });
  });
  
  app.get('/api/surveys/:surveyid/:choice', (req, res) => {
    res.send('Thanks for responding.');
  });
};

const stringToRecipientArray = recipientStr => {
  // Split at , or ;, with optional whitespace
  return recipientStr.split(/[,;]\s*/).map(email => ({ email: email.trim() }));
};
