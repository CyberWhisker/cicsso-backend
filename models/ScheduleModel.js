const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
    eventId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amIn: {
        type: Date,
        required: true
    },
    amOut: {
        type: Date,
        required: true
    },
    pmIn: {
        type: Date,
        required: true
    },
    pmOut: {
        type: Date,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Schedule', ScheduleSchema)

