const studentsRouter = require('express').Router()
const Student = require('../models/Student')
const sanitizeBody = require('../middleware/sanitizeBody')

studentsRouter.get('/', async (req, res) => {
  const students = await Student.find()
  res.send({data: students})
})

studentsRouter.post('/', sanitizeBody, async (req, res) => {
  try {
    const newStudent = new Student(req.sanitizedBody)
    await newStudent.save()
    res.status(201).send({data: newStudent})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

studentsRouter.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) throw new Error('Resource not found')
    res.send({data: student})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

studentsRouter.patch('/:id', async (req, res) => {
  try {
    const {_id, ...otherAttributes} = req.body.data
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {_id: req.params.id, ...otherAttributes},
      {
        new: true,
        runValidators: true
      }
    )
    if (!student) throw new Error('Resource not found')
    res.send({data: student})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

studentsRouter.put('/:id', async (req, res) => {
  try {
    const {_id, ...otherAttributes} = req.body.data
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {_id: req.params.id, ...otherAttributes},
      {
        new: true,
        overwrite: true,
        runValidators: true
      }
    )
    if (!student) throw new Error('Resource not found')
    res.send({data: student})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

studentsRouter.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id)
    if (!student) throw new Error('Resource not found')
    res.send({data: student})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

function sendResourceNotFound(req, res) {
  res.status(404).send({
    errors: [
      {
        status: '404',
        title: 'Resource does not exist',
        description: `We could not find a student with id: ${req.params.id}`
      }
    ]
  })
}

module.exports = studentsRouter