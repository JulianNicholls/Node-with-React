const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();
const port = process.env.PORT || 5000;

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreeshToken, profile, done) => {
      console.log({ accessToken, refreeshToken, profile });
      return done(null, profile);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  console.log({ req, res });
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.send({ OAuth: 'Successful' });
});

app.listen(port, () => {
  console.log('Server running on port', port);
});
