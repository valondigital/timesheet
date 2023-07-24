const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    company: { type: String, required: false },
    address: { type: String, required: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
