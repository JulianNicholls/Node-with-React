const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({root: 'root'});
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});