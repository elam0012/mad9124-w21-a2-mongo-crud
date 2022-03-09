'use strict'

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/assignment-2', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }).then(() => console.log('Connected to MongoDB ...'))
  .catch(err => {
    console.error('Problem connecting to MongoDB ...', err.message)
    process.exit(1)
  })

//load dependencies
const express = require('express')
const morgan = require('morgan')
const app = express()
const studentsRouter = require("./routers/studentsRouter.js")
const coursesRouter = require("./routers/coursesRouter.js")

// configure the middleware
app.use(morgan("tiny"))
app.use(express.json())
app.use("/api/students", studentsRouter)
app.use("/api/courses", coursesRouter)

//start the web server
const port = 3000;
app.listen(port, () => {console.log(`Server is running on http://localhost:${port}`)});