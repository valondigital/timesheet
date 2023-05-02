const express = require('express');
const {
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  // checkId,
} = require('../controllers/userController');
const { signUp, login } = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(signUp);
router.route('/login').post(login);
// router.param('id', checkId);

router.route('/').get(getAllUsers);

router.route('/:id').get(getUserDetails).patch(updateUser).delete(deleteUser);

module.exports = router;
