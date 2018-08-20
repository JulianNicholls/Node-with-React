const express = require('express');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const billingRoutes = require('./routes/billing');

const { mongoURI, cookieKey } = require('./config/keys');

require('./models/User');

require('./services/passport');

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

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// I prefer this way, rather than require('./routes/x')(app);
authRoutes(app);
billingRoutes(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets,
  // i.e. mainXXX.js and mainXXX.css
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognise the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server running on port', port);
});
