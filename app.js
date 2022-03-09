'use strict'

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/assignment-2', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB ...'))
  .catch(err => {
    console.error('Problem connecting to MongoDB ...', err.message)
    process.exit(1)
  })

//load dependencies
const express = require('express')
const morgan = require('morgan')
const app = express()

// configure the middleware
app.use(morgan('tiny'))
app.use(express.json())
app.use("/api/students", require("./routers/studentsRouter.js"))
// app.use("/api/courses", require("./routers/coursesRouter.js"))

//start the web server
const port = process.env.PORT || 3030
app.listen(port, () => console.log(`HTTP server listening on port ${port} ...`))