const express = require('express')
const { storeData, getData, getDataById, deleteData, updateData, getDataBySchedId, getDataByUserId, getDataByUserIdSchedId } = require('../controllers/AttendanceController');

const router = express.Router();

//Get all
router.get('/', getData)

//Get Single
router.get('/:id', getDataById)

//Get Schedule By Event Id
router.get('/sched/:id', getDataBySchedId)

//Get Schedule By Event Id
router.get('/user/:id', getDataByUserId)

//Post Request
router.post('/', storeData)

//Delete Request
router.delete('/:id', deleteData)

//Update Request
router.patch('/:id', updateData)

//Update Request
router.get('/user/schedule/:userId/:schedId', getDataByUserIdSchedId)

module.exports = router