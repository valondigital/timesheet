const express = require('express');
const {
  getAllPublicHolidays,
  createPublicHoliday,
  deletePublicHoliday,
  getPublicHolidayDetails,
  updatePublicHoliday,
} = require('../controllers/publicHolidayController');
const authController = require('../controllers/authController');

const { protectRoute, restrictTo } = authController;

const router = express.Router();

router
  .route('/')
  .get(protectRoute, getAllPublicHolidays)
  .post(protectRoute, restrictTo('admin', 'super-admin'), createPublicHoliday);

router
  .route('/:id')
  .get(getPublicHolidayDetails)
  .patch(protectRoute, restrictTo('admin', 'super-admin'), updatePublicHoliday)
  .delete(
    protectRoute,
    restrictTo('admin', 'super-admin'),
    deletePublicHoliday
  );

module.exports = router;
