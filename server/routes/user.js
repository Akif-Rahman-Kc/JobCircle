const express = require('express');
const router = express.Router();
const userController = require('../controller/userConroller')

// Authentication

router.post('/signup', userController.userSignUp)
router.post('/signin', userController.userSignIn)

module.exports = router;