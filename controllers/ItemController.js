const Model = require('../models/ItemModel')
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

//Get Single Data
const getDataByProjectId = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }

    const data = await Model.find({project: id})

    if(!data) {
        return res.status(404).json({error: 'No record found'})
    }

    res.status(200).json(data)
}

//Post Data
const storeData = async (req, res) => {
    try {
        const data = await Model.create({...req.body})
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

module.exports = {
    getData,
    getDataById,
    storeData,
    deleteData,
    updateData,
    getDataByProjectId
}