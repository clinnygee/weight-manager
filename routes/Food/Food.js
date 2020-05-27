const express = require('express');
const router = express.Router();
const withAuth = require('../../middleware/auth');

const FoodController = require('./Food.controller');

router.post('/add', withAuth, FoodController.add);

// router.get('/:category/:foodName', withAuth, FoodController.byId);



module.exports = router;