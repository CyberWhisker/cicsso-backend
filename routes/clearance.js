const express = require('express')
const { storeData, getData, getDataById, deleteData, updateData, fetchClearanceByUserandSchoolYear, getClearanceByUserId } = require('../controllers/ClearanceController');

const router = express.Router();

//Get all
router.get('/', getData)

router.get('/getClearanceByUserId/:id', getClearanceByUserId)

//Get Single
router.get('/:id', getDataById)

//Get Single
router.get('/:user/:schoolYear', fetchClearanceByUserandSchoolYear)

//Post Request
router.post('/', storeData)

//Delete Request
router.delete('/:id', deleteData)

//Update Request
router.patch('/:id', updateData)

module.exports = router