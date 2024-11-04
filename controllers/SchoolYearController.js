const Model = require('../models/SchoolYearModel')
const mongoose = require('mongoose')

//Get Data
const getData = async (req, res) => {
    // const data = await Model.find({}).sort({createdAt: -1})
    const data = await Model.find({}).populate({
        path: 'transactionId',
        populate: {
            path: 'collectionId' // Populate collectionId within transactionId
        }
    }).sort({createdAt: -1})
    res.status(200).json(data)
}

const storeData = async (req, res) => {
    
    try {
        const data = await Model.create({
            ...req.body
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

const updateData = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }
    
    try {
        const data = await Model.findOneAndUpdate({_id: id} , {
            ...req.body
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

const deleteData = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }
    
    try {
        const data = await Model.findOneAndDelete({_id: id})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

module.exports = {
    getData,
    storeData,
    updateData,
    deleteData
}