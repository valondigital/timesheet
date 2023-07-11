const express = require('express');
const {
  getAllTasks,
  createTask,
  deleteTask,
  getTaskDetails,
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
  .delete(protectRoute, restrictTo('admin', 'super-admin'), deleteTask);

module.exports = router;
