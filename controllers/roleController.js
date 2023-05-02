const Role = require('../models/roleModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.createRole = catchAsync(async (req, res) => {
  const newRole = await Role.create(req.body);
  res.status(200).json({
    message: 'Role created successfully',
    data: {
      Role: newRole,
    },
  });
});

exports.getAllRoles = catchAsync(async (req, res) => {
  const features = new APIFeatures(Role.find(), req.query)
    .filter()
    .sort()
    .limitField()
    .paginate();

  const Roles = await features.query;

  res.status(200).json({
    status: 'success',
    results: Roles.length,
    data: {
      Roles,
    },
  });
});

exports.getRoleDetails = catchAsync(async (req, res, next) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    return next(
      new AppError(
        `Can't find role with id ${req.params.id} on this server`,
        404
      )
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      role,
    },
  });
});

exports.updateRole = catchAsync(async (req, res) => {
  const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      role,
    },
  });
});

exports.deleteRole = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'Role has been deleted successfully',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
