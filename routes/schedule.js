const express = require('express')
const { storeData, getData, getDataById, deleteData, updateData, getDataByEventId, getDataByDate } = require('../controllers/ScheduleController');

const router = express.Router();

//Get all
router.get('/', getData)

//Get Single
router.get('/:id', getDataById)

//Get Schedule By Event Id
router.get('/event/:id', getDataByEventId)

//Post Request
router.post('/', storeData)

//Delete Request
router.delete('/:id', deleteData)

//Update Request
router.patch('/:id', updateData)

//Date Request
router.get('/date/:id', getDataByDate)

module.exports = router