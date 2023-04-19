const express = require('express');
const {
  getAllUsers,
  createUser,
  getUserDetails,
  updateUser,
  deleteUser,
  checkId,
} = require('../controllers/userController');

const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUserDetails).patch(updateUser).delete(deleteUser);

module.exports = router;
