const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    projectId: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Item', ItemSchema)

