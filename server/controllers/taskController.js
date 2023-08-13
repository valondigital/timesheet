// eslint-disable
const Task = require('../models/taskModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

// Custom middleware to check user authorization for updating tasks
exports.checkTaskAuthorization = catchAsync(async (req, res, next) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  const task = await Task.findById(taskId);

  if (!task) {
    return next(new AppError('Task not found', 404));
  }

  if (
    task.assignedTo._id.toString() !== userId &&
    req.user.role !== 'admin' &&
    req.user.role !== 'super-admin' &&
    req.user.role !== 'project-manager'
  ) {
    return next(new AppError('Unauthorized to update this task', 403));
  }

  // If the user is authorized, pass control to the next middleware
  next();
});

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
  const totalElements = await Task.countDocuments();
  const pageSize = req.query.size ? Number(req.query.size) : 10;
  const totalPages = Math.ceil(totalElements / pageSize);

  res.status(200).json({
    status: 'success',
    results: Tasks.length,
    totalElements,
    totalPages,
    data: Tasks,
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

exports.updateTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    message: 'Task updated sucessfully',
    data: {
      task,
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
