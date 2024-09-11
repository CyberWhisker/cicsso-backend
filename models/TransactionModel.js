const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    collectionId: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Transaction', TransactionSchema)

