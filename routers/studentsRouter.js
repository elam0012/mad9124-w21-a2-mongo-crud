const studentsRouter = require('express').Router()
const Student = require('../models/Student')

studentsRouter.get('/', async (req, res) => {
  const students = await Student.find()
  res.send({data: students})
})

studentsRouter.post('/', async (req, res) => {
  let data = req.body.data
  delete data._id

  let newStudent = new Student(data)
  await newStudent.save()

  res.status(201).send({data: newStudent})
})

studentsRouter.get('/:id', async (req, res) => {})

studentsRouter.patch('/:id', async (req, res) => {})

studentsRouter.put('/:id', async (req, res) => {})

studentsRouter.delete('/:id', async (req, res) => {})

module.exports = studentsRouter