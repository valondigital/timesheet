const express = require('express');
const {
  getAllClients,
  createClient,
  addProjectToClient,
  deleteClient,
  getClientDetails,
} = require('../controllers/clientController');
const authController = require('../controllers/authController');

const { protectRoute, restrictTo } = authController;

const router = express.Router();

router
  .route('/')
  .get(protectRoute, getAllClients)
  .post(protectRoute, restrictTo('admin', 'super-admin'), createClient);

router
  .route('/:id')
  .get(getClientDetails)
  .patch(protectRoute, restrictTo('admin', 'super-admin'), addProjectToClient)
  .delete(protectRoute, restrictTo('admin', 'super-admin'), deleteClient);

module.exports = router;
