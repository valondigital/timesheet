const Role = require('../models/roleModel');
const APIFeatures = require('../utils/apiFeatures');

exports.createRole = async (req, res) => {
  try {
    const newRole = await Role.create(req.body);
    res.status(200).json({
      message: 'Role created successfully',
      data: {
        Role: newRole,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const features = new APIFeatures(Role.find(), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();

    const Roles = await features.query;

    res.status(200).json({
      status: 'success',
      results: Roles.length,
      data: {
        Roles,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getRoleDetails = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        role,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        role,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'Role has been deleted successfully',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
