const express = require('express')
const { storeData, getData, getDataById, deleteData, updateData, fetchEventsWithAttendanceByUserId } = require('../controllers/EventController');

const router = express.Router();

//Get all
router.get('/', getData)

router.get('/fetchEventsWithAttendanceByUserId/:id', fetchEventsWithAttendanceByUserId)

//Get Single
router.get('/:id', getDataById)

//Post Request
router.post('/', storeData)

//Delete Request
router.delete('/:id', deleteData)

//Update Request
router.patch('/:id', updateData)

module.exports = router