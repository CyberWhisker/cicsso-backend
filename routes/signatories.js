const express = require('express')
const multer  = require('multer')
const { storeData, getData, deleteData, updateData } = require('../controllers/SignatoriesController');

const router = express.Router();

// Multer Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../cicsso/public/signatureImg/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname)
    }
  })

const upload = multer({ storage: storage })

//Get all
router.get('/', getData)

//Post Request
router.post('/', upload.single('file'), storeData)

//Delete Request
router.delete('/:id', deleteData)

//Update Request
router.patch('/:id', upload.single('file'), updateData)

module.exports = router