const mongoose = require('mongoose');

const timeLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A time log must be assigned to an employee'],
    },
    checkIn: {
      type: Date,
      default: Date.now,
      required: true,
    },
    checkOut: {
      type: Date,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const TimeLog = mongoose.model('TimeLog', timeLogSchema);

module.exports = TimeLog;
