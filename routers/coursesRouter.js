const coursesRouter = require('express').Router()
const Course = require('../models/Course')

coursesRouter.get('/', async (req, res) => {
  const courses = await Course.find().populate('students')
  res.send({data: courses})
})

coursesRouter.post('/', async (req, res) => {
  try {
    const newCourse = new Course(req.sanitizedBody)
    await newCourse.save()
    res.status(201).send({data: newCourse})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

coursesRouter.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('students')
    if (!course) throw new Error('Resource not found')
    res.send({data: course})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

coursesRouter.patch('/:id', async (req, res) => {
  try {
    const {_id, ...otherAttributes} = req.body.data
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {_id: req.params.id, ...otherAttributes},
      {
        new: true,
        runValidators: true
      }
    )
    if (!course) throw new Error('Resource not found')
    res.send({data: course})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

coursesRouter.put('/:id', async (req, res) => {
  try {
    const {_id, ...otherAttributes} = req.body.data
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {_id: req.params.id, ...otherAttributes},
      {
        new: true,
        overwrite: true,
        runValidators: true
      }
    )
    if (!course) throw new Error('Resource not found')
    res.send({data: course})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

coursesRouter.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndRemove(req.params.id)
    if (!course) throw new Error('Resource not found')
    res.send({data: course})
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
        description: `We could not find a course with id: ${req.params.id}`
      }
    ]
  })
}

module.exports = coursesRouter