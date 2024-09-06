const Model = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const login = async (req, res) => {
    res.status(200).json({mssg: 'Login Success'})
}

const register = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await Model.registerHash(email, password)
        // Token
        const token = createToken(user._id)
        res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    login,
    register
}