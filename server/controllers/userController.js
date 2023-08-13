const User = require('../models/userModel');
const Task = require('../models/taskModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getAllUsers = catchAsync(async (req, res) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitField()
    .paginate();

  const users = await features.query;

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new AppError(
        `Can't find user with id ${req.params.id} on this server`,
        404
      )
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(
      new AppError(
        `Can't find user with id ${req.params.id} on this server`,
        404
      )
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // create an error if the user tries to update password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. please use /updateMyPassword',
        400
      )
    );
  }

  const filteredBody = filterObj(
    req.body,
    'firstName',
    'lastName',
    'email',
    'phone'
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });

  // if not, update the user document
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    isActive: false,
  });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(
      new AppError(
        `Can't find user with id ${req.params.id} on this server`,
        404
      )
    );
  }
  res.status(204).json({
    status: 'success',
    message: 'User has been deleted successfully',
  });
});

exports.getTasksByUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Create a separate APIFeatures instance for counting total tasks
    const countFeatures = new APIFeatures(
      Task.find({ assignedTo: id }),
      req.query
    ).filter();

    // Count the total assigned tasks
    const totalElements = await countFeatures.query.countDocuments();

    // Now create a new APIFeatures instance for paginating
    const features = new APIFeatures(Task.find({ assignedTo: id }), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();

    const tasks = await features.query;

    const pageSize = req.query.size ? Number(req.query.size) : 10;
    const totalPages = Math.ceil(totalElements / pageSize);

    res.status(200).json({
      status: 'success',
      totalElements,
      totalPages,
      data: tasks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
