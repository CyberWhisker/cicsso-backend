const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
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
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

// Virtual field
ScheduleSchema.virtual('attendances', {
    ref: 'Attendance',
    localField: '_id',
    foreignField: 'schedule',
});

module.exports = mongoose.model('Schedule', ScheduleSchema)

