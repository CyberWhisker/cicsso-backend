const Model = require('../models/ClearanceModel')
const mongoose = require('mongoose')

//Get Data
const getData = async (req, res) => {
    const data = await Model.find({}).populate('user').populate({
        path: 'schoolYear',
        model: 'SchoolYear',
        populate: [
            {
                path: 'collection',
                model: 'Collection',
                populate: {
                    path: 'eventId',
                    model: 'Event',
                    // populate: {
                    //     path: 'schedules',
                    //     model: 'Schedule',
                    //     populate: {
                    //         path: 'attendances',
                    //         model: 'Attendance',
                    //     }
                    // }
                },
                // populate: {
                //     path: 'transaction',
                //     model: 'Transaction'
                // }
            },
            {
                path: 'signatories',
                model: 'Signatories'
            }
        ]

    }).sort({ createdAt: -1 })
    res.status(200).json(data)
}

const getClearanceByUserId = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.find({ user: id }).populate('user').populate({
        path: 'schoolYear',
        model: 'SchoolYear',
        populate: [
            { path: 'collection', model: 'Collection' },
            { path: 'signatories', model: 'Signatories' }
        ]

    }).sort({ createdAt: -1 })
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
        const { user, schedule } = req.body;
        const existingDocument = await Model.findOne({ user, schedule });

        if (existingDocument) {
            return res.status(400).json({ error: 'Data already exists' });
        }
        const data = await Model.create({ ...req.body })
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

//Update Data
const updateSelectedClearance = async (req, res) => {
    const { status, usersId } = req.body
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({ error: 'Not valid ID' })
    // }

    const data = await Model.updateMany({ _id: usersId }, {
        status: status
    })

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    res.status(200).json(req.body)
}

const fetchClearanceByUserandSchoolYear = async (req, res) => {
    const { user, schoolYear } = req.params

    if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }
    if (!mongoose.Types.ObjectId.isValid(schoolYear)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.findOne({ schoolYear: schoolYear, user: user }).populate('schoolYear')

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
    fetchClearanceByUserandSchoolYear,
    getClearanceByUserId,
    updateSelectedClearance
}