const TimeLog = require('../models/timeLogModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createTimeLog = catchAsync(async (req, res) => {
  const { user, checkIn, tasks, checkOut, workHours, note } = req.body;
  const newTimeLog = await TimeLog.create({
    user,
    checkIn,
    tasks,
    checkOut,
    workHours,
    note,
  });
  res.status(200).json({
    status: 'success',
    data: {
      timeLog: newTimeLog,
    },
  });
});

exports.getAllLogs = catchAsync(async (req, res) => {

  const logs = await TimeLog.find({ user: req.user });

  res.status(200).json({
    status: 'success',
    data: {
      logs,
    },
  });
});

exports.updateTimeLog = catchAsync(async (req, res, next) => {
  const { user, checkIn, tasks, checkOut, workHours, note } = req.body;
  const timeLog = await TimeLog.findById(req.params.id);

  if (!timeLog) {
    return next(
      new AppError(`Time log with ID ${req.params.id} not found.`, 404)
    );
  }

  timeLog.user = user;
  timeLog.checkIn = checkIn;
  timeLog.tasks = tasks;
  timeLog.checkOut = checkOut;
  timeLog.workHours = workHours;
  timeLog.note = note;
  await timeLog.save();

  res.status(200).json({
    status: 'success',
    data: {
      timeLog,
    },
  });
});
