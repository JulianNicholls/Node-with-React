const { Schema } = require('mongoose');

const userSchema = new Schema({
  googleID: String
});

mongoose.model('users', userSchema);
