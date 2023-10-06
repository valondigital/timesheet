const PublicHoliday = require('../models/publicHolidayModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.createPublicHoliday = catchAsync(async (req, res) => {
  const newPublicHoliday = await PublicHoliday.create(req.body);
  res.status(200).json({
    message: 'PublicHoliday created successfully',
    data: {
      publicHoliday: newPublicHoliday,
    },
  });
});

exports.getAllPublicHolidays = catchAsync(async (req, res) => {
  const features = new APIFeatures(PublicHoliday.find(), req.query)
    .filter()
    .sort()
    .limitField()
    .paginate();

  const publicHolidays = await features.query;

  res.status(200).json({
    status: 'success',
    results: publicHolidays.length,
    data: publicHolidays,
  });
});

exports.updatePublicHoliday = catchAsync(async (req, res) => {
  const publicHoliday = await PublicHoliday.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!publicHoliday) {
    return res.status(404).json({ status: 'Public Holiday not found' });
  }

  res.status(200).json({
    status: 'Public Holiday updated successfully',
    data: {
      publicHoliday,
    },
  });
});

exports.deletePublicHoliday = async (req, res) => {
  try {
    await PublicHoliday.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'Public Holiday has been deleted successfully',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getPublicHolidayDetails = catchAsync(async (req, res, next) => {
  const publicHoliday = await PublicHoliday.findById(req.params.id);

  if (!publicHoliday) {
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
      publicHoliday,
    },
  });
});
