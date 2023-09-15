const TimeLog = require('../models/timeLogModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const TimeLogMethods = require('../utils/timelog');
const APIFeatures = require('../utils/apiFeatures');

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
  const features = new APIFeatures(
    TimeLog.find({ user: req.user }).sort({ createdAt: -1 }),
    req.query
  )
    .filter()
    .sort()
    .limitField()
    .paginate();

  const Logs = await features.query;
  const totalElements = await TimeLog.countDocuments();
  const pageSize = req.query.size ? Number(req.query.size) : 10;
  const totalPages = Math.ceil(totalElements / pageSize);

  res.status(200).json({
    status: 'success',
    results: Logs.length,
    totalElements,
    totalPages,
    data: Logs,
  });
});

exports.getLogDetails = catchAsync(async (req, res, next) => {
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

const checkDateStatus = (customDate) => {
  const startOfDay = new Date(customDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(customDate);
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
  const { startOfDay, endOfDay } = checkDateStatus(req.query.date);
  const logs = await TimeLog.find({
    checkIn: { $gte: startOfDay, $lt: endOfDay },
  });
  const usersWithClockedInStatus = new Set();
  logs.forEach((log) => {
    usersWithClockedInStatus.add({
      userId: log.user.toString(),
      checkIn: log.checkIn,
      checkOut: log.checkOut,
    });
  });
  const allUsers = await User.find({});
  const usersClockInStatus = allUsers.map((user) => ({
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    checkIn: TimeLogMethods.getCheckInTime(
      usersWithClockedInStatus,
      user._id.toString()
    ),
    checkOut: TimeLogMethods.getCheckOutTime(
      usersWithClockedInStatus,
      user._id.toString()
    ),
    hasClockedIn: TimeLogMethods.hasClockedIn(
      usersWithClockedInStatus,
      user._id.toString()
    ),
  }));

  res.status(200).json({
    status: 'success',
    data: usersClockInStatus,
  });
});
