const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'A user must have a first name'],
      maxLength: [
        40,
        'A Users firstname must have less or equal than 40 characters',
      ],
      minLength: [
        3,
        'A users first name must have more or equal than 3 characters',
      ],
    },
    lastName: {
      type: String,
      required: [true, 'A user must have a first name'],
      maxLength: [
        40,
        'A Users lastname must have less or equal than 40 characters',
      ],
      minLength: [
        3,
        'A users last name must have more or equal than 10 characters',
      ],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Please enter a valid phone number'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only work on create or save
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    role: {
      type: String,
      enum: ['employee', 'admin', 'super-admin'],
      default: 'employee',
    },
    isActive: {
      type: Boolean,
      default: false,
      select: false,
    },
    country: {
      type: String,
      required: true,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre('save', async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  // delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  //notice that the line below ensures that the password modified date is always lesser than when the jwt token was created. because sometimes saving to the database takes timw
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// userSchema.pre(/^find/, function (next) {
//   this.find({ isActive: { $ne: false } });
//   next();
// });
// this points to all the query
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // This means the token was issued before the user changed the password
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);
  //this adds 10 seconds before the token actually expires
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
