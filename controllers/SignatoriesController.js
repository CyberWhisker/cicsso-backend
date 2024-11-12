const Model = require('../models/SignatoriesModel')
const mongoose = require('mongoose')

//Get Data
const getData = async (req, res) => {
    const data = await Model.find({}).populate('schoolYear')
    res.status(200).json(data)
}

const storeData = async (req, res) => {
    try {
        const data = await Model.create({
            ...req.body,
            image: req.file ? req.file.filename : null
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

const getSignatoriesBySchoolYear = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }
    try {
        const data = await Model.findOne({schoolYear: id})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

const updateData = async (req, res) => {
    const {id} = req.params
    const {image} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }
    
    try {
        const data = await Model.findOneAndUpdate({_id: id} , {
            ...req.body,
            image: req.file ? req.file.filename : image
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
    deleteData,
    getSignatoriesBySchoolYear
}