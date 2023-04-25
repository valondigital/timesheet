const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A user must have a first name'],
  },
  lastName: {
    type: String,
    required: [true, 'A user must have a first name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter a valid email'],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'Please enter a valid phone number'],
    unique: true,
  },
  username: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
