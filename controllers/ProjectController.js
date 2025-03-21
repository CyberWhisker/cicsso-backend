const Model = require('../models/ProjectModel')
const Item = require('../models/ItemModel')
const mongoose = require('mongoose')

//Get Data
const getData = async (req, res) => {
    const data = await Model.find({})
        .populate({
            path: 'collectionId',
            model: 'Collection',
            populate: {
                path: 'transaction',
                model: 'Transaction',
            }
        })
        .populate({
            path: 'items',
            model: 'Item'
        })
        .sort({ createdAt: -1 });
    res.status(200).json(data)
}

//Get Single Data
const getDataById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.findOne({ _id: id })
        .populate({
            path: 'collectionId',
            model: 'Collection',
            populate: {
                path: 'transaction',
                model: 'Transaction',
            }
        })
        .populate({
            path: 'items',
            model: 'Item'
        })

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    res.status(200).json(data)
}

//Post Data
const storeData = async (req, res) => {
    try {
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
    await Item.deleteMany({ project: id })

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

const getDataBySchoolYearId = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }
    const data = await Model.find({ schoolYearId: id })
        .populate({
            path: 'collectionId',
            model: 'Collection',
            populate: {
                path: 'transaction',
                model: 'Transaction',
            }
        })
        .populate({
            path: 'items',
            model: 'Item'
        })

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    res.status(200).json(data)
}

const getProjectBySchoolYearIdWithRemainder = async (req, res) => {
    const { id } = req.params
    // const id = '677c832857fbaf651efdc933'

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.find({ schoolYearId: id })
        .populate({
            path: 'collectionId',
            model: 'Collection',
            populate: [
                {
                    path: 'transaction',
                    model: 'Transaction',
                    match: { status: 'confirm' }
                },
                {
                    path: 'project',
                    model: 'Project',
                    populate: {
                        path: 'items',
                        model: 'Item'
                    }
                }
            ]
        })
        .populate('items');

    const formattedData = data.map((item) => {
        let totalProject = 0;
        const totalTrans = item.collectionId.transaction?.reduce(
            (acc, curr) => acc + (curr.amount || 0), // Make sure to access the correct field
            0
        ) ?? 0;
        const totalProjectAll = item.collectionId.project.map((item) => {
            const totalItems = item.items?.reduce(
                (acc, curr) => acc + curr.amount * curr.quantity, 0
            ) ?? 0;
            totalProject += totalItems;
        });
        const currentTotalProject = item.items?.reduce((acc, curr) => acc + curr.amount * curr.quantity, 0) ?? 0;
        return {
            _id: item._id,
            project: item.project,
            status: item.status,
            collectionId: item.collectionId._id,
            collectionName: item.collectionId.collectionName,
            totalProject: currentTotalProject,
            remaining: totalTrans - totalProject,
        }
    })

    res.status(200).json(formattedData)
}

module.exports = {
    getData,
    getDataById,
    storeData,
    deleteData,
    updateData,
    getDataBySchoolYearId,
    getProjectBySchoolYearIdWithRemainder
}