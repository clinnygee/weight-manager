const express = require('express');
const router = express.Router();
const AuthenticationController = require('./Authentication.controller');
const withAuth = require('../../middleware/auth');

router.post('/login', AuthenticationController.logIn);

router.post('/register', AuthenticationController.register);

router.post('/logout', AuthenticationController.logOut);

router.get('/checkToken', withAuth, AuthenticationController.checkToken);




module.exports = router;