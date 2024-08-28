require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const EventsRoutes = require('./routes/events')

const port = process.env.PORT

// Express app
const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/api/event', EventsRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen
        app.listen(port, () => console.log(`Connected to DB & Listening to port: ${port}!`)) 
    })
    .catch((error) => console.log(error))

