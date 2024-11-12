const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
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
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
}, { timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true} })

module.exports = mongoose.model('Item', ItemSchema)

