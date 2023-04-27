const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'A user must have a first name'],
      maxLength: [
        40,
        'A Users firstname must have less or equal than 40 characters',
      ],
      minLength: [3, 'A users name must have more or equal than 3 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'A user must have a first name'],
      maxLength: [
        40,
        'A Users firstname must have less or equal than 40 characters',
      ],
      minLength: [3, 'A users name must have more or equal than 10 characters'],
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
    password: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
