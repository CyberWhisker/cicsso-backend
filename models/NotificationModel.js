const mongoose = require('mongoose')

const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transactionId: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    message: {
        type: String,
    },
    adminStatus: {
        type: Boolean,
        default: true
    },
    userStatus: {
        type: Boolean,
        default: true
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })


module.exports = mongoose.model('Notification', NotificationSchema)

