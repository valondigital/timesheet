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
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    checkOut: {
      type: Date,
      default: null,
    },
    workHours: {
      type: Number,
      default: null
    },
    note: {
      type: String,
      default: '',
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


timeLogSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tasks',
    select: '-createdAt -updatedAt -__v',
  }).populate({
    path: 'user',
    select: '-createdAt -updatedAt -__v',
  });
  next();
});

const TimeLog = mongoose.model('TimeLog', timeLogSchema);

module.exports = TimeLog;
