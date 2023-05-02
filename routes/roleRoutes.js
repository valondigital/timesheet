const express = require('express');
const { getAllRoles, createRole } = require('../controllers/roleController');
const authController = require('../controllers/authController');

const { protectRoute } = authController;

const router = express.Router();

router.route('/').get(protectRoute, getAllRoles).post(createRole);

module.exports = router;
