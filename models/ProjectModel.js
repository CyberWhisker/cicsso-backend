const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    project: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
}, { timestamps: true })

module.exports = mongoose.model('Project', ProjectSchema)

