const express = require('express');
const {
  checkAllUsersClockInStatus,
} = require('../controllers/timeLogController');
const authController = require('../controllers/authController');

const { protectRoute, restrictTo } = authController;

const router = express.Router();

router
  .route('/')
  .get(
    protectRoute,
    restrictTo('admin', 'super-admin'),
    checkAllUsersClockInStatus
  );

// router
//   .route('/:date')
//   .get(
//     protectRoute,
//     restrictTo('admin', 'super-admin'),
//     checkAllUsersClockInStatus
//   );
module.exports = router;
