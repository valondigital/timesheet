// eslint-disable
const Client = require('../models/clientModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.createClient = catchAsync(async (req, res) => {
  const { firstName, lastName, email, phone, projects } = req.body;
  const newClient = await Client.create({
    firstName,
    lastName,
    email,
    phone,
    projects,
  });
  res.status(200).json({
    message: 'Client created successfully',
    data: {
      Client: newClient,
    },
  });
});

exports.getAllClients = catchAsync(async (req, res) => {
  const features = new APIFeatures(Client.find(), req.query)
    .filter()
    .sort()
    .limitField()
    .paginate();

  const Clients = await features.query;

  res.status(200).json({
    status: 'success',
    results: Clients.length,
    data: {
      Clients,
    },
  });
});

exports.getClientDetails = catchAsync(async (req, res, next) => {
  const department = await Client.findById(req.params.id);

  if (!department) {
    return next(
      new AppError(
        `Can't find department with id ${req.params.id} on this server`,
        404
      )
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      department,
    },
  });
});

exports.deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'Client has been deleted successfully',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.addProjectToClient = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    return next(new AppError(`Client not found with id ${req.params.id}`, 404));
  }

  // Add the new project to the projects array
  client.projects.push(req.body.projectId);

  // Save the updated client
  await client.save();

  res.status(200).json({
    status: 'success',
    message: 'Client updated successfully',
    data: {
      client,
    },
  });
});
