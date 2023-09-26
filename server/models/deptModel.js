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
    hod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model for the HOD
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

departmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'hod',
    select: '-passwordChangedAt -createdAt -updatedAt -__v',
  });
  next();
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
