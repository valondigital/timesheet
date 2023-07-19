const express = require('express');
const {
  createTimeLog,
  updateTimeLog,
  getAllLogs,
  getLogDetails,
} = require('../controllers/timeLogController');
const authController = require('../controllers/authController');

const { protectRoute } = authController;

const router = express.Router();

router
  .route('/')
  .get(protectRoute, getAllLogs)
  .post(protectRoute, createTimeLog);

router
  .route('/:id')
  .get(protectRoute, getLogDetails)
  .patch(protectRoute, updateTimeLog);

module.exports = router;
