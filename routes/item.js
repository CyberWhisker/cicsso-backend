const express = require('express')
const { storeData, getData, getDataById, deleteData, updateData, getDataByProjectId } = require('../controllers/ItemController');

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

//Get By Project ID
router.get('/project/:id', getDataByProjectId)

module.exports = router