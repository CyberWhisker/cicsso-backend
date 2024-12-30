const express = require('express')
const { storeData, getData, getDataById, deleteData, updateData, getCollectionWithTransactionByUserId, getCollectionBySchoolYear, getCollectionWithEventsAndAttendance, getCollectionWithTransaction, getDataWithTransactionBySchoolYearId, getDataBySchoolYearAndUserId } = require('../controllers/CollectionController');

const router = express.Router();

//Get all
router.get('/', getData)

router.get('/getCollectionWithTransaction', getCollectionWithTransaction)

router.get('/getCollectionWithEventsAndAttendance/:id', getCollectionWithEventsAndAttendance)

router.get('/getDataBySchoolYearAndUserId/:schoolYear/:userId', getDataBySchoolYearAndUserId)

router.get('/getDataWithTransactionBySchoolYearId/:id', getDataWithTransactionBySchoolYearId)

router.get('/getCollectionWithTransactionByUserId/:id', getCollectionWithTransactionByUserId)

router.get('/getCollectionBySchoolYear/:id', getCollectionBySchoolYear)


//Get Single
router.get('/:id', getDataById)

//Post Request
router.post('/', storeData)

//Delete Request
router.delete('/:id', deleteData)

//Update Request
router.patch('/:id', updateData)



module.exports = router