const express = require('express')
const { storeData, getData, deleteData, updateData, getActiveSchoolYear } = require('../controllers/SchoolYearController');

const router = express.Router();

//Get all
router.get('/', getData)

//Active Request
router.get('/activeSchoolYear', getActiveSchoolYear)

//Post Request
router.post('/', storeData)

//Delete Request
router.delete('/:id', deleteData)

//Update Request
router.patch('/:id', updateData)


module.exports = router