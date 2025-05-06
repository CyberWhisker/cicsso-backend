const Model = require('../models/TransactionModel')
const mongoose = require('mongoose')
const { storeNotification } = require('./NotificationController')


//Get Data
const getData = async (req, res) => {
    // const data = await Model.find({}).sort({createdAt: -1})
    const data = await Model.find({}).populate('collectionId').populate('userId')
    res.status(200).json(data)
}

//Get Data by status
const getDataByStatus = async (req, res) => {
    const { status } = req.params
    const data = await Model.find({ status: status })
    res.status(200).json(data)
}

//Get Single Data
const getDataById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.find({ _id: id })

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    res.status(200).json(data)
}

//Get Single Data
const getDataByCollectionId = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.find({ collectionId: id }).sort({ createdAt: -1 })

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    res.status(200).json(data)
}

//Post Data
const storeData = async (req, res) => {
    try {
        const data = await Model.create({
            ...req.body,
            // image: req.file ? req.file.filename : null
        });
        const dataForm = {
            userId: data.userId,
            transactionId: data._id,
            message: "Transaction has been Submitted"
        }
        await storeNotification(dataForm)

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Delete Data
const deleteData = async (req, res) => {
    const { id } = req.params
    const { message } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.findOneAndDelete({ _id: id })

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    const dataForm = {
        userId: data.userId,
        message: message || "Transaction has been Removed"
    }

    await storeNotification(dataForm)

    res.status(200).json({ message: 'Successfully Deleted' })
}

//Update Data
const updateData = async (req, res) => {
    const { id } = req.params
    const { message } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.findOneAndUpdate({ _id: id }, {
        ...req.body,
        // image: req.file ? req.file.filename : image
    })

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    const dataForm = {
        userId: data.userId,
        transactionId: data._id,
        message: message || "Transaction has been Updated"
    }
    await storeNotification(dataForm)

    res.status(200).json(req.body)
}

//Get Transaction by User ID
const getDataByUserId = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.find({ userId: id }).populate('userId').populate('collectionId')

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    res.status(200).json(data)
}

module.exports = {
    getData,
    getDataById,
    storeData,
    deleteData,
    updateData,
    getDataByCollectionId,
    getDataByUserId,
    getDataByStatus
}