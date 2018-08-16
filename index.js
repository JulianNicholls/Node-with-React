const express = require('express');

require('./services/passport');
const authRoutes = require('./routes/auth');

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
