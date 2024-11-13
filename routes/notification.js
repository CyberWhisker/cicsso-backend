const express = require('express')
const { getData, getDataByUserId, updateData, deleteData } = require('../controllers/NotificationController');

const router = express.Router();

router.get('/', getData)

router.get('/getDataByUserId/:id', getDataByUserId)

router.patch('/:id', updateData)

router.delete('/:id', deleteData)



module.exports = router