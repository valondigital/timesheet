const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Task must belong to a project'],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'inProgress', 'completed'],
      default: 'pending',
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

taskSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'assignedTo',
    select: '-createdAt -updatedAt -__v',
  }).populate({
    path: 'project',
    select: '-createdAt -updatedAt -__v',
  });
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
