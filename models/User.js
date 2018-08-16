const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  displayName: String
});

mongoose.model('users', userSchema);
