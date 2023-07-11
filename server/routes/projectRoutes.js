const express = require('express');
const {
  getAllProjects,
  createProject,
  deleteProject,
  getProjectDetails,
  getTasksByProject,
} = require('../controllers/projectController');
const authController = require('../controllers/authController');

const { protectRoute, restrictTo } = authController;

const router = express.Router();

router
  .route('/')
  .get(protectRoute, getAllProjects)
  .post(protectRoute, restrictTo('admin', 'super-admin'), createProject);

router
  .route('/:id')
  .get(getProjectDetails)
  .delete(protectRoute, restrictTo('admin', 'super-admin'), deleteProject);

router.route('/:id/tasks').get(getTasksByProject);

module.exports = router;
