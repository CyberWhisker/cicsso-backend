const express = require('express')
const { storeData, getData, getDataById, deleteData, updateData, getDataBySchoolYearId, getProjectBySchoolYearIdWithRemainder } = require('../controllers/ProjectController');

const router = express.Router();

//Get all
router.get('/', getData)

router.get('/getDataBySchoolYearId/:id', getDataBySchoolYearId)
router.get('/getProjectBySchoolYearIdWithRemainder/:id', getProjectBySchoolYearIdWithRemainder)

//Get Single
router.get('/:id', getDataById)

//Post Request
router.post('/', storeData)

//Delete Request
router.delete('/:id', deleteData)

//Update Request
router.patch('/:id', updateData)

module.exports = router