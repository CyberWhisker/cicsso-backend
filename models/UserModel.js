const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name : {
        type: String
    },
    year : {
        type: String
    },
    section : {
        type: String
    }, 
    role : {
        type: String
    }, 
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

// Static register method
UserSchema.statics.registerHash = async function(email, password, name, section, year) {
    const exists = await this.findOne({email})

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        email,
        name,
        section,
        year,
        role: 'user',
        password: hash
    })

    return user
}

UserSchema.statics.loginHash = async function(email, password) {
    const user = await this.findOne({email})

    if(!user) {
        throw Error('Invalid Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', UserSchema)

