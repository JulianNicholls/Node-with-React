const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

require('./models/User');

require('./services/passport');

const { mongoURI } = require('./config/keys');

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true }
);

const app = express();
const port = process.env.PORT || 5000;

// I prefer this way, rather than
// require('./routes/x')(app);
authRoutes(app);

app.get('/', (req, res) => {
  res.send({ OAuth: 'Successful' });
});

app.listen(port, () => {
  console.log('Server running on port', port);
});
