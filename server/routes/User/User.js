const express = require('express');
const router = express.Router();
const withAuth = require('../../middleware/auth');

const UserController = require('./User.controller');

router.get('', withAuth, UserController.all);

router.post('/settings', withAuth, UserController.settings);

module.exports = router;