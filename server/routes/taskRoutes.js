const express = require('express');
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskDetails,
  checkTaskAuthorization,
} = require('../controllers/taskController');
const authController = require('../controllers/authController');

const { protectRoute, restrictTo } = authController;

const router = express.Router();

router
  .route('/')
  .get(protectRoute, getAllTasks)
  .post(protectRoute, restrictTo('admin', 'super-admin'), createTask);

router
  .route('/:id')
  .get(getTaskDetails)
  .patch(protectRoute, checkTaskAuthorization, updateTask)
  .delete(protectRoute, restrictTo('admin', 'super-admin'), deleteTask);

module.exports = router;
