const mongoose = require('mongoose');

const leaveApplicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    leaveType: {
      type: String,
      enum: ['casual', 'medical', 'other'],
      required: true,
    },
    startLeaveDate: { type: Date, required: true },
    endLeaveDate: { type: Date, required: true },
    reason: { type: String, required: true },
    hodApproval: {
      status: {
        type: String,
        enum: ['pending', 'approved', 'declined'],
        default: 'pending',
      },
      approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    adminApproval: {
      status: {
        type: String,
        enum: ['pending', 'approved', 'declined'],
        default: 'pending',
      },
      approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

leaveApplicationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'applicant',
    select: 'firstName lastName role availableLeaveDays email department phone',
  })
    .populate({
      path: 'hodApproval.approvedBy',
      select: 'firstName lastName role -_id',
    })
    .populate({
      path: 'adminApproval.approvedBy',
      select: 'firstName lastName role -_id',
    });
  next();
});

const LeaveApplication = mongoose.model(
  'LeaveApplication',
  leaveApplicationSchema
);

module.exports = LeaveApplication;
