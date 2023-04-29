const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.signUp = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(200).json({
    message: 'User created successfully',
    data: {
      user: newUser,
    },
  });
});
