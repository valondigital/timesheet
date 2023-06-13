const Department = require('../models/deptModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.createDepartment = catchAsync(async (req, res) => {
  const newDepartment = await Department.create(req.body);
  res.status(200).json({
    message: 'Department created successfully',
    data: {
      Department: newDepartment,
    },
  });
});

exports.getAllDepartments = catchAsync(async (req, res) => {
  const features = new APIFeatures(Department.find(), req.query)
    .filter()
    .sort()
    .limitField()
    .paginate();

  const Departments = await features.query;

  res.status(200).json({
    status: 'success',
    results: Departments.length,
    data: {
      Departments,
    },
  });
});

exports.deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'Department has been deleted successfully',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getDepartmentDetails = catchAsync(async (req, res, next) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
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
      department,
    },
  });
});
