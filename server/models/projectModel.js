const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: {
    type: String,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Project must belong to a client'],
  },
});
projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'client',
    select: '-createdAt -updatedAt -__v',
  });
  next();
});
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
