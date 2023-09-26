const UserLeave = require('../models/userLeaveModel');
const User = require('../models/userModel');
const Department = require('../models/deptModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const calculateLeaveDays = (startDateStr, endDateStr) => {
  let leaveDays = 0;
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      leaveDays += 1;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return leaveDays;
};

exports.applyForLeave = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(
      new AppError(`Can't find user with id ${req.user.id} on this server`, 404)
    );
  }
  const startDate = new Date(req.body.startLeaveDate);
  const endDate = new Date(req.body.endLeaveDate);
  const leaveDaysRequested = calculateLeaveDays(startDate, endDate);
  console.log({ leaveDaysRequested }, user.availableLeaveDays);
  if (leaveDaysRequested > 14) {
    return res
      .status(400)
      .json({ message: 'Maximum leave duration is 14 days.' });
  }
  if (leaveDaysRequested > user.availableLeaveDays) {
    return res
      .status(400)
      .json({ message: 'Insufficient available leave days.' });
  }
  const newLeaveApplication = await UserLeave.create({
    applicant: req.user.id,
    ...req.body,
  });
  user.availableLeaveDays -= leaveDaysRequested;
  // await user.save();
  res.status(200).json({
    message: 'Leave application successful',
    data: {
      newLeaveApplication,
    },
  });
});

exports.getAllLeaveApplications = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(UserLeave.find(), req.query)
    .filter()
    .sort()
    .limitField()
    .paginate();

  const LeaveApplications = await features.query;
  const totalElements = await UserLeave.countDocuments();
  const pageSize = req.query.size ? Number(req.query.size) : 10;
  const totalPages = Math.ceil(totalElements / pageSize);

  res.status(200).json({
    status: 'success',
    results: LeaveApplications.length,
    totalElements,
    totalPages,
    data: LeaveApplications,
  });
});

exports.updateLeaveStatusByHod = catchAsync(async (req, res, next) => {
  const leaveApplication = await UserLeave.findById(req.params.id);
  if (!leaveApplication) {
    return res.status(404).json({ message: 'Leave application not found.' });
  }
  const hodId = req.user.id;
  const { applicant } = leaveApplication;
  const employee = await User.findById(applicant);
  if (!employee.department) {
    return res
      .status(400)
      .json({ message: 'Employee is not assigned to a department.' });
  }
  const department = await Department.findById(employee.department);

  // Check if the HOD (user making the request) matches the HOD of the department
  if (hodId.toString() !== department.hod._id.toString()) {
    return res
      .status(403)
      .json({ message: 'You are not authorized to approve this leave.' });
  }
  const newStatus = req.body.status; // This should be 'approved' or 'rejected'
  leaveApplication.hodApproval.status = newStatus;
  leaveApplication.hodApproval.approvedBy = hodId;
  await leaveApplication.save();

  res.status(200).json({ message: `Leave application ${newStatus} by HOD.` });
});

exports.updateLeaveStatusByAdmin = catchAsync(async (req, res, next) => {
  const leaveApplication = await UserLeave.findById(req.params.id);
  if (!leaveApplication) {
    return res.status(404).json({ message: 'Leave application not found.' });
  }
  const adminId = req.user.id;
  const { applicant } = leaveApplication;
  const employee = await User.findById(applicant);
  if (!employee.department) {
    return res
      .status(400)
      .json({ message: 'Employee is not assigned to a department.' });
  }
  const department = await Department.findById(employee.department);

  if (leaveApplication.hodApproval.status !== 'approved') {
    return res.status(403).json({
      message: `Leave application not approved by ${department.hod.firstName} ${department.hod.lastName}`,
    });
  }

  const newStatus = req.body.status;
  leaveApplication.adminApproval.status = newStatus;
  leaveApplication.adminApproval.approvedBy = adminId;
  const { startLeaveDate, endLeaveDate } = leaveApplication;
  const leaveDaysRequested = calculateLeaveDays(startLeaveDate, endLeaveDate);
  console.log({ leaveDaysRequested, startLeaveDate, endLeaveDate });
  const payload = {
    availableLeaveDays: applicant.availableLeaveDays - leaveDaysRequested,
  };
  const user = await User.findByIdAndUpdate(applicant, payload, {
    new: true,
    runValidators: true,
  });
  await leaveApplication.save();

  res.status(200).json({
    message: `Leave application ${newStatus} for ${user.firstName} ${user.lastName}`,
  });
});
