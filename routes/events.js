const express = require('express')
const Event = require('../models/EventModel');
const { storeData, getData, getDataById, deleteData, updateData } = require('../controllers/EventController');

const router = express.Router();

//Get all
router.get('/', getData)

//Get Single
router.get('/:id', getDataById)

//Post Request
router.post('/', storeData)

//Delete Request
router.delete('/:id', deleteData)

//Update Request
router.patch('/:id', updateData)

module.exports = router