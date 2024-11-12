const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SchoolYearSchema = new Schema({
    semester: {
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
    status: {
        type: Boolean,
        default: true
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

SchoolYearSchema.virtual('collection', {
    ref: 'Collection',
    localField: '_id',
    foreignField: 'schoolYearId',
});

SchoolYearSchema.virtual('signatories', {
    ref: 'Signatories',
    localField: '_id',
    foreignField: 'schoolYear',
});

module.exports = mongoose.model('SchoolYear', SchoolYearSchema)

