const express = require('express');
const {
  applyForLeave,
  getAllLeaveApplications,
  updateLeaveStatusByHod,
  updateLeaveStatusByAdmin,
  getLeaveApplicationDetails,
  getUserLeaveHistory,
} = require('../controllers/userLeaveController');
const authController = require('../controllers/authController');

const { protectRoute, restrictTo } = authController;

const router = express.Router();

router
  .route('/')
  .get(
    protectRoute,
    restrictTo('admin', 'super-admin', 'hod'),
    getAllLeaveApplications
  )
  .post(protectRoute, applyForLeave);

router.route('/leave-history').get(protectRoute, getUserLeaveHistory);

router.route('/:id').get(protectRoute, getLeaveApplicationDetails);
router
  .route('/:id/hod-approval')
  .patch(protectRoute, restrictTo('hod'), updateLeaveStatusByHod);

router
  .route('/:id/admin-approval')
  .patch(
    protectRoute,
    restrictTo('admin', 'super-admin'),
    updateLeaveStatusByAdmin
  );
module.exports = router;
