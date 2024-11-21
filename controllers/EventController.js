const Model = require('../models/EventModel')
const Schedule = require('../models/ScheduleModel')
const Collection = require('../models/CollectionModel')
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
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }

    const data = await Model.find({_id: id})

    if(!data) {
        return res.status(404).json({error: 'No record found'})
    }

    res.status(200).json(data)
}

//Post Data
const storeData = async (req, res) => {
    try {
        const data = await Model.create({...req.body})
        const schoolYearData = await SchoolYear.findOne({status: true})
        await Collection.create({
            collectionName: data.event,
            schoolYearId: schoolYearData._id,
            startDate: data.startDate,
            endDate: data.endDate,
            eventId: data._id,
            fine: 20,
        })
        res.status(200).json(data) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//Delete Data
const deleteData = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }

    const data = await Model.findOneAndDelete({_id: id})
    await Schedule.deleteMany({event: id})
    const collection = await Collection.findOneAndDelete({eventId: id})
    if (collection) {
        await Transaction.findOneAndDelete({collectionId: collection._id})
    }

    if (!data) {
        return res.status(404).json({error: 'No record found'})
    }

    res.status(200).json({message: 'Successfully Deleted'})
}

//Update Data
const updateData = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }

    const data = await Model.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!data) {
        return res.status(404).json({error: 'No record found'})
    }

    res.status(200).json(req.body)
}

const fetchEventsWithAttendanceByUserId = async (req, res) => {
    const {id} = req.params
    try {
        const data = await Model.find({}).populate({
            path: 'schedules',
            model: 'Schedule',
            populate: {
                path: 'attendances',
                model: 'Attendance',
                match: {user: id}
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

module.exports = {
    getData,
    getDataById,
    storeData,
    deleteData,
    updateData,
    fetchEventsWithAttendanceByUserId
}