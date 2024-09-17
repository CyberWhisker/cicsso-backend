const Model = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const getUsers = async (req, res) => {
    try {
        const data = await Model.find({}).sort({createdAt: -1})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

const getUserById = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }
    try {
        const data = await Model.findOne({_id: id})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const data = await Model.loginHash(email, password)
        const token = createToken(data._id)
        res.status(200).json({token: token, user: { _id: data._id, email: data.email, name: data.name, role: data.role}})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const register = async (req, res) => {
    const {email, password, name, section, year} = req.body
    try {
        const user = await Model.registerHash(email, password, name, section, year)
        const token = createToken(user._id)
        res.status(200).json({token, user: {_id: user._id, email: user.email, name: user.name, role: user.role}})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const verifyUser = async (req, res) => {
    const {token} = req.body
    try {
        const result = jwt.verify(token, process.env.SECRET)
        if (!result) {
            res.status(400).json({error: 'invalid token'})
        }
        const userData = jwt.decode(token)
        res.status(200).json({user: userData})
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
        ...req.body,
        image: req.file ? req.file.filename : null
    })

    if (!data) {
        return res.status(404).json({error: 'No record found'})
    }

    res.status(200).json(req.body)
}

const getUsersWithAttendanceBySchedId = async (req, res) => {
    const {id} = req.params
    try {
        const data = await Model.find({}).populate({
            path: 'attendances',
            model: 'Attendance',
            match: {schedule: id}
        })
    
        if (!data) {
            return res.status(404).json({error: 'No record found'})
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

const getUsersWithAttendance = async (req, res) => {
    try {
        const data = await Model.find({}).populate({
            path: 'attendances',
            model: 'Attendance',
        })
    
        if (!data) {
            return res.status(404).json({error: 'No record found'})
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

module.exports = {
    login,
    register,
    verifyUser,
    getUsers,
    getUserById,
    updateData,
    deleteData,
    getUsersWithAttendanceBySchedId,
    getUsersWithAttendance
}