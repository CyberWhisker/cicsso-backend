const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AttendanceSchema = new Schema({
    schedule: {
        type: Schema.Types.ObjectId,
        ref: 'Schedule',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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

