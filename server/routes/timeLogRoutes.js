const express = require('express');
const {
  createTimeLog,
  updateTimeLog,
  getAllLogs,
} = require('../controllers/timeLogController');
const authController = require('../controllers/authController');

const { protectRoute } = authController;

const router = express.Router();

router
  .route('/')
  .get(protectRoute, getAllLogs)
  .post(protectRoute, createTimeLog)
  .patch(protectRoute, updateTimeLog);

module.exports = router;
