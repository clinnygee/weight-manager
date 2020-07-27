const express = require('express');
const router = express.Router();
const withAuth = require('../../middleware/auth');

const SearchController = require('./Search.controller');

router.post('/measurement/:foodId', withAuth, SearchController.Measurement);

router.get('/:category/:foodName', withAuth, SearchController.byId);



module.exports = router;