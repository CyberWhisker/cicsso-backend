const express = require('express')
const multer  = require('multer')
const {login, register, verifyUser, getUsers, getUserById, deleteData, updateData, getUsersWithAttendanceBySchedId, getUsersWithAttendance, getUserWithTransaction} = require('../controllers/UserController')
const router = express.Router();

// Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../cicsso/public/gcashImg/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + file.originalname)
  }
})
  
const upload = multer({ storage: storage })

//User Login
router.post('/login', login)

//User Registration
router.post('/register', register)

//User Verify
router.post('/verify', verifyUser)

//Get All Users
router.get('/', getUsers)

//Get Users with Attendance
router.get('/getUsersWithAttendance', getUsersWithAttendance)
router.get('/getUsersWithAttendanceBySchedId/:id', getUsersWithAttendanceBySchedId)

//Get User
router.get('/:id', getUserById)

//Delete User
router.delete('/:id', deleteData)
//Update User
router.patch('/:id', updateData)

module.exports = router