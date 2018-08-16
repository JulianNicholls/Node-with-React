const express = require('express');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');

const authRoutes = require('./routes/auth');

require('./models/User');

require('./services/passport');

const { mongoURI, cookieKey } = require('./config/keys');

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true }
);

const app = express();

// Configure App

app.use(
  cookieSession({
    maxAge: 25 * 3600 * 1000, // 25 hours of milliseconds
    keys: [cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// I prefer this way, rather than
// require('./routes/x')(app);
authRoutes(app);

app.get('/', (req, res) => {
  res.send({ OAuth: 'Successful' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server running on port', port);
});
