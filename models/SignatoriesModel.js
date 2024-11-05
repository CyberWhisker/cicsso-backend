const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SignatoriesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    schoolYear: {
        type: Schema.Types.ObjectId,
        ref: 'SchoolYear',
        required: true
    },
    role: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Signatories', SignatoriesSchema)

