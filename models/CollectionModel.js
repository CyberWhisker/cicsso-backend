const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CollectionSchema = new Schema({
    collectionName: {
        type: String,
        required: true
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
    },
    schoolYearId: {
        type: Schema.Types.ObjectId,
        ref: 'SchoolYear',
    },
    fine: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        // required: true
    },
    endDate: {
        type: Date,
        // required: true
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

// Virtual field for transactions
CollectionSchema.virtual('transaction', {
    ref: 'Transaction', // Ensure 'Transaction' is the exact name of the model
    localField: '_id',
    foreignField: 'collectionId', // This should match the field in Transaction
});

module.exports = mongoose.model('Collection', CollectionSchema)

