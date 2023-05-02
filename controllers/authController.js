const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
exports.signUp = catchAsync(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    passwordConfirm,
    country,
  } = req.body;
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    passwordConfirm,
    country,
  });

  const token = signToken(newUser._id);
  res.status(201).json({
    message: 'User created successfully',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password'), 400);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', null));
  }

  const token = signToken(user._id);
  res.status(200).json({
    staus: 'success',
    token,
  });
});

exports.protectRoute = catchAsync(async (req, res, next) => {
  // 1) Get the token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not authorized', 401));
  }

  // 2) Verify the token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) check if user still exists

  // 4) check if user changed the password after the token was issued
  next();
});
