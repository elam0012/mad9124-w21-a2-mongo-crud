"use strict"

const mongoose = require('mongoose')
const debug = require('debug')('mad9124-w21-a2-mongo-crud:db')

mongoose.connect('mongodb://localhost:27017/assignment-2', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => debug('Connected to MongoDB ...'))
.catch(err => {
  debug('Problem connecting to MongoDB ...', err.message)
  process.exit(1)
})
