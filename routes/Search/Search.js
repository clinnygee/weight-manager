const express = require('express');
const router = express.Router();
const withAuth = require('../../middleware/auth');

const SearchController = require('./Search.controller');

router.get('/:category/:foodName', withAuth, SearchController.byId);

router.get('/measurement/:foodId', withAuth, SearchController.Measurement)

module.exports = router;