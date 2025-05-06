const express = require('express')
const multer = require('multer')
const { storeData, getData, getDataById, deleteData, updateData, getDataByCollectionId, getDataByUserId, getDataByStatus } = require('../controllers/TransactionController');
const router = express.Router();

// Multer Setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../cicsso/public/gcashImg/')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now()
//     cb(null, uniqueSuffix + file.originalname)
//   }
// })

// const upload = multer({ storage: storage })

//Get all
router.get('/', getData)


//Get Single
router.get('/:id', getDataById)

//Get all By Status
router.get('/getDataByStatus/:status', getDataByStatus)

//Get Schedule By Event Id
router.get('/collection/:id', getDataByCollectionId)

//Get Schedule By User Id
router.get('/user/:id', getDataByUserId)

//Post Request
// router.post('/', upload.single('file'), storeData)
router.post('/', storeData)

//Delete Request
router.delete('/:id', deleteData)

//Update Request
// router.patch('/:id', upload.single('file'), updateData)
router.patch('/:id', updateData)

module.exports = router