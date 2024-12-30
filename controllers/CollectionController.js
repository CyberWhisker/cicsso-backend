const Model = require('../models/CollectionModel')
const Transaction = require('../models/TransactionModel')
const SchoolYear = require('../models/SchoolYearModel')
const mongoose = require('mongoose')

//Get Data
const getData = async (req, res) => {
    // const data = await Model.find({}).sort({createdAt: -1})
    const data = await Model.find({})
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

//Post Data
const storeData = async (req, res) => {
    try {
        const schoolYearData = await SchoolYear.findOne({ status: true })
        const data = await Model.create({
            ...req.body,
            schoolYearId: schoolYearData._id
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

//Delete Data
const deleteData = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.findOneAndDelete({ _id: id })
    await Transaction.deleteMany({ collectionId: id })
    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    res.status(200).json({ message: 'Successfully Deleted' })
}

//Update Data
const updateData = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    res.status(200).json(req.body)
}

const getCollectionWithTransaction = async (req, res) => {
    const data = await Model.find({})
        .populate({
            path: 'transaction',
            model: 'Transaction'
        })
        .populate({
            path: 'project',
            model: 'Project',
            populate: {
                path: 'items',
                model: 'Item'
            }
        })
    res.status(200).json(data)
}

const getCollectionWithTransactionByUserId = async (req, res) => {
    // const data = await Model.find({}).sort({createdAt: -1})
    const { id } = req.params
    const data = await Model.find({}).populate({
        path: 'transaction',
        model: 'Transaction',
        match: { userId: id },
        options: { limit: 1 }
    }).populate({
        path: 'eventId',
        model: 'Event',
        populate: {
            path: 'schedules',
            model: 'Schedule',
            populate: {
                path: 'attendances',
                model: 'Attendance',
                match: { user: id }
            }
        }
    })
    res.status(200).json(data)
}

// new Update
const getCollectionBySchoolYear = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.find({ schoolYearId: id })

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    res.status(200).json(data)
}

const getCollectionWithEventsAndAttendance = async (req, res) => {
    const data = await Model.find({}).populate({
        path: 'transaction',
        model: 'Transaction',
        options: { limit: 1 }
    }).populate({
        path: 'eventId',
        model: 'Event',
        populate: {
            path: 'schedules',
            model: 'Schedule',
            populate: {
                path: 'attendances',
                model: 'Attendance',
            }
        }
    })
    res.status(200).json(data)
}

const getDataWithTransactionBySchoolYearId = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.find({ schoolYearId: id })
        .populate({
            path: 'transaction',
            model: 'Transaction'
        })
        .populate({
            path: 'project',
            model: 'Project',
            populate: {
                path: 'items',
                model: 'Item'
            }
        })
    res.status(200).json(data)
}

const getDataBySchoolYearAndUserId = async (req, res) => {
    const { schoolYear, userId } = req.params
    const data = await Model.find({ schoolYearId: schoolYear }).populate({
        path: 'transaction',
        model: 'Transaction',
        match: { userId: userId },
        options: { limit: 1 }
    }).populate({
        path: 'eventId',
        model: 'Event',
        populate: {
            path: 'schedules',
            model: 'Schedule',
            populate: {
                path: 'attendances',
                model: 'Attendance',
                match: { user: userId }
            }
        }
    })
    res.status(200).json(data)
}

module.exports = {
    getData,
    getDataById,
    storeData,
    deleteData,
    updateData,
    getCollectionWithTransactionByUserId,
    getCollectionBySchoolYear,
    getCollectionWithEventsAndAttendance,
    getCollectionWithTransaction,
    getDataWithTransactionBySchoolYearId,
    getDataBySchoolYearAndUserId
}