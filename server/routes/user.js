const express = require('express');
const router = express.Router();
const userController = require('../controller/userConroller')

// Authentication

router.post('/signup', userController.userRegister)

module.exports = router;