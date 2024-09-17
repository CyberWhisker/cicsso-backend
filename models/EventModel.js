const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EventSchema = new Schema({
    event: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }  })

// Virtual field
EventSchema.virtual('schedules', {
    ref: 'Schedule',
    localField: '_id',
    foreignField: 'event',
});

module.exports = mongoose.model('Event', EventSchema)

