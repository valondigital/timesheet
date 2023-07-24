// eslint-disable
const Project = require('../models/projectModel');
const Task = require('../models/taskModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.createProject = catchAsync(async (req, res) => {
  const { name, description, client } = req.body;
  const newProject = await Project.create({
    name,
    description,
    client
  });
  res.status(200).json({
    message: 'Project created successfully',
    data: {
      Project: newProject,
    },
  });
});

exports.getAllProjects = catchAsync(async (req, res) => {
  const features = new APIFeatures(Project.find(), req.query)
    .filter()
    .sort()
    .limitField()
    .paginate();

  const Projects = await features.query;

  res.status(200).json({
    status: 'success',
    results: Projects.length,
    data: {
      Projects,
    },
  });
});

exports.getProjectDetails = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(
      new AppError(
        `Can't find role with id ${req.params.id} on this server`,
        404
      )
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      project,
    },
  });
});

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'Department has been deleted successfully',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
// Controller function to get tasks assigned to a project
exports.getTasksByProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await Task.find({ project: id });
    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
