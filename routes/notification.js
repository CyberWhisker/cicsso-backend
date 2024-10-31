const express = require('express')
const { getData, getDataByUserId, updateData } = require('../controllers/NotificationController');

const router = express.Router();

//Get all
router.get('/', getData)

router.patch('/:id', updateData)

//Get Single
router.get('/getDataByUserId/:id', getDataByUserId)


module.exports = router