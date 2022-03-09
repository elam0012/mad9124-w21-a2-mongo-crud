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

studentsRouter.put('/:id', async (req, res) => {})

studentsRouter.delete('/:id', async (req, res) => {})

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