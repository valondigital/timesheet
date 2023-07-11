const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

clientSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'projects',
    select: '-createdAt -updatedAt -__v',
  });
  next();
});
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
