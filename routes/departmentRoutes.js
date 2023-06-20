const express = require('express');
const {
  getAllDepartments,
  createDepartment,
  deleteDepartment,
  getDepartmentDetails,
} = require('../controllers/deptController');
const authController = require('../controllers/authController');

const { protectRoute, restrictTo } = authController;

const router = express.Router();

router
  .route('/')
  .get(protectRoute, getAllDepartments)
  .post(protectRoute, restrictTo('admin', 'super-admin'), createDepartment);

router
  .route('/:id')
  .get(getDepartmentDetails)
  .delete(protectRoute, restrictTo('admin', 'super-admin'), deleteDepartment);

module.exports = router;
