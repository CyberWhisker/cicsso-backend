const express = require('express')
const {login, register, verifyUser, getUsers, getUserById, deleteData, updateData} = require('../controllers/UserController')
const router = express.Router();

//User Login
router.post('/login', login)

//User Registration
router.post('/register', register)

//User Verify
router.post('/verify', verifyUser)

//Get All Users
router.get('/', getUsers)

//Get User
router.get('/:id', getUserById)

//Delete User
router.delete('/:id', deleteData)

//Update User
router.patch('/:id', updateData)

module.exports = router