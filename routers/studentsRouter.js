const studentsRouter = require('express').Router()
const Student = require('../models/Student')

studentsRouter.get('/', async (req, res) => {
  const students = await Student.find()
  res.send({data: students})
})

studentsRouter.post('/', async (req, res) => {})

studentsRouter.get('/:id', async (req, res) => {})

studentsRouter.patch('/:id', async (req, res) => {})

studentsRouter.put('/:id', async (req, res) => {})

studentsRouter.delete('/:id', async (req, res) => {})

module.exports = studentsRouter