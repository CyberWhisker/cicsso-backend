require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const UserRoutes = require('./routes/user')
const EventsRoutes = require('./routes/events')
const ScheduleRoutes = require('./routes/schedule')
const AttendanceRoutes = require('./routes/attendance')
const ProjectRoutes = require('./routes/project')
const ItemRoutes = require('./routes/item')
const CollectionRoutes = require('./routes/collection')
const TransactionRoutes = require('./routes/transaction')
const NotificationRoutes = require('./routes/notification')

const port = process.env.PORT

// Express app
const app = express()

// Enable CORS
const cors = require('cors');

//Security
app.use(cors({
    // origin: 'http://localhost:5173',
    origin: '*',
}));

// Middleware
app.use(express.json())

// Routes
app.use('/api/user', UserRoutes)
app.use('/api/event', EventsRoutes)
app.use('/api/schedule', ScheduleRoutes)
app.use('/api/attendance', AttendanceRoutes)
app.use('/api/project', ProjectRoutes)
app.use('/api/item', ItemRoutes)
app.use('/api/collection', CollectionRoutes)
app.use('/api/transaction', TransactionRoutes)
app.use('/api/notification', NotificationRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen
        app.listen(port, () => console.log(`Connected to DB & Listening to port: ${port}!`)) 
    })
    .catch((error) => console.log(error))

