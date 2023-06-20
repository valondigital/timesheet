const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

departmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'employees',
    select: '-passwordChangedAt -createdAt -updatedAt -__v',
  });
  next();
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
