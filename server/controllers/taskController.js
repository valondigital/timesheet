// eslint-disable
const Task = require('../models/taskModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.createTask = catchAsync(async (req, res) => {
  const { name, description, project, assignedTo, dueDate } = req.body;
  const newTask = await Task.create({
    name,
    description,
    project,
    assignedTo,
    dueDate,
  });
  res.status(200).json({
    message: 'Task created successfully',
    data: {
      Task: newTask,
    },
  });
});

exports.getAllTasks = catchAsync(async (req, res) => {
  const features = new APIFeatures(Task.find(), req.query)
    .filter()
    .sort()
    .limitField()
    .paginate();

  const Tasks = await features.query;

  res.status(200).json({
    status: 'success',
    results: Tasks.length,
    data: {
      Tasks,
    },
  });
});

exports.getTaskDetails = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new AppError(
        `Can't find task with id ${req.params.id} on this server`,
        404
      )
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      Task,
    },
  });
});

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'Task has been deleted successfully',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
