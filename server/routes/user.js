const express = require('express');
const router = express.Router();
const userController = require('../controller/userConroller')

// Authentication

router.post('/signup', userController.userSignUp)
router.post('/signup_details', userController.userSignUpDetails)

module.exports = router;