const TimeLog = require('../models/timeLogModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createTimeLog = catchAsync(async (req, res) => {
  const { checkIn, tasks } = req.body;

  if (!tasks || tasks.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'The "tasks" field is required and cannot be empty.',
    });
  }

  const newTimeLog = await TimeLog.create({
    user: req.user,
    checkIn,
    tasks,
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

exports.getLogDetails = catchAsync(async (req, res) => {
  const log = await TimeLog.findById(req.params.id);

  if (!log) {
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
      log,
    },
  });
});

exports.updateTimeLog = catchAsync(async (req, res, next) => {
  const { checkOut, workHours, note, tasks } = req.body;
  const timeLog = await TimeLog.findById(req.params.id);

  if (!timeLog) {
    return next(
      new AppError(`Time log with ID ${req.params.id} not found.`, 404)
    );
  }

  timeLog.checkOut = checkOut;
  timeLog.workHours = workHours;
  timeLog.note = note;
  timeLog.tasks = tasks;
  await timeLog.save();

  res.status(200).json({
    status: 'success',
    data: {
      timeLog,
    },
  });
});

const checkDateStatus = () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  return {
    startOfDay,
    endOfDay,
  };
};

exports.checkUserClockInStatus = catchAsync(async (req, res) => {
  const { startOfDay, endOfDay } = checkDateStatus();
  const logs = await TimeLog.find({
    user: req.user,
    checkIn: { $gte: startOfDay, $lt: endOfDay },
  });
  const userHasClockedIn = logs.length > 0;

  res.status(200).json({
    status: 'success',
    data: userHasClockedIn,
  });
});

exports.checkAllUsersClockInStatus = catchAsync(async (req, res) => {
  const { startOfDay, endOfDay } = checkDateStatus();
  const logs = await TimeLog.find({
    checkIn: { $gte: startOfDay, $lt: endOfDay },
  });
  const usersWithClockedInStatus = new Set();

  // Loop through the logs and add user IDs to the set
  logs.forEach((log) => {
    usersWithClockedInStatus.add(log.user.toString());
  });

  // Query all users and determine their clock-in status based on the set
  const allUsers = await User.find({});
  const usersClockInStatus = allUsers.map((user) => ({
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    hasClockedIn: usersWithClockedInStatus.has(user._id.toString()),
  }));

  res.status(200).json({
    status: 'success',
    data: usersClockInStatus,
  });
});
