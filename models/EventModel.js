const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Event', EventSchema)

