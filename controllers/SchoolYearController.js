const Model = require('../models/SchoolYearModel')
const mongoose = require('mongoose')

//Get Data
const getData = async (req, res) => {
    const data = await Model.find({})
    res.status(200).json(data)
}

const storeData = async (req, res) => {
    try {
        const data = await Model.create({...req.body})
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

//Get Single Data
const getActiveSchoolYear = async (req, res) => {

    const data = await Model.findOne({status: true})

    if(!data) {
        return res.status(404).json({error: 'No record found'})
    }

    res.status(200).json(data)
}

module.exports = {
    getData,
    storeData,
    updateData,
    deleteData,
    getActiveSchoolYear
}