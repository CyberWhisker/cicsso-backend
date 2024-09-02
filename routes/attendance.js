const express = require('express')
const { storeData, getData, getDataById, deleteData, updateData, getDataBySchedId } = require('../controllers/AttendanceController');

const router = express.Router();

//Get all
router.get('/', getData)

//Get Single
router.get('/:id', getDataById)

//Get Schedule By Event Id
router.get('/sched/:id', getDataBySchedId)

//Post Request
router.post('/', storeData)

//Delete Request
router.delete('/:id', deleteData)

//Update Request
router.patch('/:id', updateData)

module.exports = router