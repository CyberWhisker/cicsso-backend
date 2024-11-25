const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    project: {
        type: String,
        required: true
    },
    collectionId: {
        type: Schema.Types.ObjectId,
        ref: "Collection",
        required: true
    },
    status: {
        type: String,
        default: 'Ongoing'
    },
    description: {
        type: String,
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

// Virtual field
ProjectSchema.virtual('items', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'project', // This is the field in AttendanceSchema that references the user
});

module.exports = mongoose.model('Project', ProjectSchema)

