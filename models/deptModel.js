const mongoose = require('mongoose');

const deptSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A department must have a valid name'],
    },
  },
  { timestamps: true }
);

const Department = mongoose.model('Department', deptSchema);

module.exports = Department;
