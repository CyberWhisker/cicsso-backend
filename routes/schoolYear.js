const express = require('express')
const { storeData, getData, deleteData, updateData } = require('../controllers/SchoolYearController');

const router = express.Router();

//Get all
router.get('/', getData)

//Post Request
router.post('/', storeData)

//Delete Request
router.delete('/:id', deleteData)

//Update Request
router.patch('/:id', updateData)

module.exports = router