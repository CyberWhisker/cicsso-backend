const express = require('express')
const { storeData, getData, getDataById, deleteData, updateData, getDataByCollectionId } = require('../controllers/TransactionController');

const router = express.Router();

//Get all
router.get('/', getData)

//Get Single
router.get('/:id', getDataById)

//Get Schedule By Event Id
router.get('/collection/:id', getDataByCollectionId)

//Post Request
router.post('/', storeData)

//Delete Request
router.delete('/:id', deleteData)

//Update Request
router.patch('/:id', updateData)

module.exports = router