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
    },
    amIn: {
        type: Date,
    },
    amOut: {
        type: Date,
    },
    pmIn: {
        type: Date,
    },
    pmOut: {
        type: Date,
    },
}, { timestamps: true })

module.exports = mongoose.model('Attendance', AttendanceSchema)

