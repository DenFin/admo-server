const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const AuthController = require('../controllers/auth.controller')


router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.get("/user", AuthController.getUser);


module.exports = router