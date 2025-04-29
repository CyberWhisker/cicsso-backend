const Model = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const sendVerificationEmail = require('../utils/sendVerificationEmail')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const getUsers = async (req, res) => {
    try {
        const data = await Model.find({}).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }
    try {
        const data = await Model.findOne({ _id: id })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await Model.loginHash(email, password)
        const token = createToken(data._id)
        res.status(200).json({ token: token, user: { _id: data._id, email: data.email, role: data.role } })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const register = async (req, res) => {
    const { email } = req.body
    try {
        const user = await Model.registerHash(req.body)
        const token = createToken(user._id)

        // Generate a verification token
        const verificationToken = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1d' });
        await sendVerificationEmail(email, user._id, verificationToken);

        res.status(200).json({ token, message: 'User registered successfully. Please check your email to verify your account.', user: { _id: user._id, email: user.email, role: user.role } })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const storeMultipleUsers = async (req, res) => {
    const defaultPassword = 'marsu2024';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(defaultPassword, salt);

    try {
        const { users, academicYear } = req.body;

        if (!users || !Array.isArray(users) || users.length === 0) {
            return res.status(400).json({ error: 'No users provided for upload.' });
        }

        // Check and sanitize each user
        const sanitizedUsers = users.filter(user => user.StudentID && user.Email); // Only allow valid entries
        if (sanitizedUsers.length !== users.length) {
            console.warn('Some users were skipped due to missing required fields.');
        }

        const studentIds = sanitizedUsers.map(user => user.StudentID);

        const usersWithAcademicYear = sanitizedUsers.map(user => ({
            updateOne: {
                filter: { studentId: user.StudentID },
                update: {
                    $set: {
                        academicYear,
                        firstName: user.firstName || '',
                        middleName: user.middleName || '',
                        lastName: user.lastName || '',
                        extensionName: user.ExtensionName || '',
                        studentId: user.StudentID,
                        program: user.Program || '',
                        year: user.Year || '',
                        section: user.Section || '',
                        email: user.Email,
                        verified: true,
                        status: true,
                    },
                    $setOnInsert: {
                        password: hash,
                        type: user.Type || 'student' // default to 'student' if Type missing
                    }
                },
                upsert: true
            }
        }));

        // Bulk insert/update users
        const insertedUsers = await Model.bulkWrite(usersWithAcademicYear, { ordered: false }); // ordered: false = continue even if some fail

        // Update status of users who are not in the current list
        await Model.updateMany(
            { studentId: { $nin: studentIds } },
            { $set: { status: false } }
        );

        res.status(201).json({ success: true, insertedCount: insertedUsers.nUpserted + insertedUsers.nModified });
    } catch (error) {
        console.error('Bulk upload error:', error);
        res.status(500).json({ error: error.message || 'Something went wrong during bulk upload.' });
    }
};

const verifyUser = async (req, res) => {
    const { token } = req.body
    try {
        const result = jwt.verify(token, process.env.SECRET)
        if (!result) {
            res.status(400).json({ error: 'invalid token' })
        }
        const userData = jwt.decode(token)
        res.status(200).json({ user: userData })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//Delete Data
const deleteData = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.findOneAndDelete({ _id: id })

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    res.status(200).json({ message: 'Successfully Deleted' })
}

//Update Data
const updateData = async (req, res) => {
    const { id } = req.params
    const { newPassword } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    if (newPassword) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)
        const data = await Model.findOneAndUpdate({ _id: id }, {
            ...req.body,
            image: req.file ? req.file.filename : null,
            password: hash
        })
        if (!data) {
            return res.status(404).json({ error: 'No record found' })
        }
    } else {
        const data = await Model.findOneAndUpdate({ _id: id }, {
            ...req.body,
            image: req.file ? req.file.filename : null,
        })
        if (!data) {
            return res.status(404).json({ error: 'No record found' })
        }
    }

    res.status(200).json(req.body)
}

const getUsersWithAttendanceBySchedId = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Model.find({}).populate({
            path: 'attendances',
            model: 'Attendance',
            match: { schedule: id }
        })

        if (!data) {
            return res.status(404).json({ error: 'No record found' })
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

const getUsersWithAttendance = async (req, res) => {
    try {
        const data = await Model.find({}).populate({
            path: 'attendances',
            model: 'Attendance',
        })

        if (!data) {
            return res.status(404).json({ error: 'No record found' })
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

const verifyEmail = async (req, res) => {
    const { token, userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET);

        if (decoded.userId !== userId) {
            throw new Error('Invalid token or user ID.');
        }

        // Update user to verified
        const user = await Model.findByIdAndUpdate(userId, { verified: true }, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ message: 'Email successfully verified!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUsersWithTransactionByAY = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }
    try {
        const data = await Model.find({ academicYear: id })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    login,
    register,
    verifyUser,
    getUsers,
    getUserById,
    updateData,
    deleteData,
    getUsersWithAttendanceBySchedId,
    getUsersWithAttendance,
    verifyEmail,
    storeMultipleUsers,
    getUsersWithTransactionByAY
}