const express = require('express')
const {login, register} = require('../controllers/UserController')
const router = express.Router();

//User Login
router.get('/login', login)

//User Registration
router.post('/register', register)

module.exports = router