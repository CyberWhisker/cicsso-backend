const express = require('express')
const { storeData, getData, getDataById, deleteData, updateData, getCollectionWithTransactionByUserId } = require('../controllers/CollectionController');

const router = express.Router();

//Get all
router.get('/', getData)

//Update Request
router.get('/getCollectionWithTransactionByUserId/:id', getCollectionWithTransactionByUserId)

//Get Single
router.get('/:id', getDataById)

//Post Request
router.post('/', storeData)

//Delete Request
router.delete('/:id', deleteData)

//Update Request
router.patch('/:id', updateData)



module.exports = router