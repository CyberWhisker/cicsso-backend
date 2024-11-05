const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    collectionId: {
        type: Schema.Types.ObjectId,
        ref: 'Collection',
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
    image: {
        type: String,
    },
    status: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    notification: {
        type: Number,
        required: true
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Transaction', TransactionSchema)

