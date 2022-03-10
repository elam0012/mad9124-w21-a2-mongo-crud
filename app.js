'use strict'

const debug = require('debug')('mad9124-w21-a2-mongo-crud')
const sanitizeMongo = require('express-mongo-sanitize')
require('./startup/database')

//load dependencies
const express = require('express')
const morgan = require('morgan')
const app = express()

// configure the middleware
app.use(morgan('tiny'))
app.use(express.json())
app.use("/api/students", require("./routers/studentsRouter.js"))
app.use("/api/courses", require("./routers/coursesRouter.js"))
app.use(sanitizeMongo())

//start the web server
const port = process.env.PORT || 3030
app.listen(port, () => debug(`HTTP server listening on port ${port} ...`))