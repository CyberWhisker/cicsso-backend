const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    academicYear: {
        type: Schema.Types.ObjectId
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    extensionName: {
        type: String
    },
    studentId: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

// Static register method
UserSchema.statics.registerHash = async function (formData) {
    const { email, password } = formData
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        ...formData,
        role: 'user',
        password: hash
    })

    return user
}

UserSchema.statics.loginHash = async function (email, password) {
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Invalid Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

// Virtual field for attendances
UserSchema.virtual('attendances', {
    ref: 'Attendance',
    localField: '_id',
    foreignField: 'user', // This is the field in AttendanceSchema that references the user
});

UserSchema.virtual('transaction', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'userId', // This is the field in AttendanceSchema that references the user
});

module.exports = mongoose.model('User', UserSchema)

