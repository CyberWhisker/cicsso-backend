const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ClearanceSchema = new Schema({
    schoolYear: {
        type: Schema.Types.ObjectId,
        ref: 'SchoolYear',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
}, { timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true} })

module.exports = mongoose.model('Clearance', ClearanceSchema)


