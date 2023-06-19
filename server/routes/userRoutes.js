const express = require('express');
const rateLimit = require('express-rate-limit');

const {
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  // checkId,
} = require('../controllers/userController');
const {
  signUp,
  login,
  protectRoute,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authController');

const router = express.Router();

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});

router
  .route('/signup')
  .post(protectRoute, restrictTo('admin', 'super-admin'), signUp);
router.route('/login').post(limiter, login);

router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);
router.route('/updateMyPassword').patch(protectRoute, updatePassword);
router.route('/updateMe').patch(protectRoute, updateMe);
router.route('/deleteMe').delete(protectRoute, deleteMe);

router.route('/').get(protectRoute, getAllUsers);

router
  .route('/:id')
  .get(getUserDetails)
  .patch(updateUser)
  .delete(protectRoute, restrictTo('admin', 'super-admin'), deleteUser);

module.exports = router;
