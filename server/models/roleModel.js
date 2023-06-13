const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A role must have a valid name'],
    },
    description: {
      type: String,
      required: [true, 'A role must have a valid description'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
