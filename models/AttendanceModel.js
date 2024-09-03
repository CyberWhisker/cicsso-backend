const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AttendanceSchema = new Schema({
    scheduleId: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
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

module.exports = mongoose.model('Attendance', AttendanceSchema)

