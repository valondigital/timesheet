const express = require('express');
const {
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  updateMe,
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

router.route('/signup').post(signUp);
router.route('/login').post(login);

router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);
router.route('/updateMyPassword').patch(protectRoute, updatePassword);
router.route('/updateMe').patch(protectRoute, updateMe);

router.route('/').get(protectRoute, getAllUsers);

router
  .route('/:id')
  .get(getUserDetails)
  .patch(updateUser)
  .delete(protectRoute, restrictTo('admin', 'super-admin'), deleteUser);

module.exports = router;
