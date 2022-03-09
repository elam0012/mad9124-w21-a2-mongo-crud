
const express = require("express");
const {courses} = require("../data/index");
const validateCourseId = require("../middleware/validateCourseId");

const coursesRouter = express.Router();
coursesRouter.use("/:courseId", validateCourseId)

coursesRouter.get("/", (req, res) => {
  res.json(courses)
});

coursesRouter.get("/:courseId", (req, res) => {
  const id = parseInt(req.params.courseId)
  res.json(courses[req.courseIndex])
});

coursesRouter.post("/", (req, res) => {
  const {data} = req.body
  if (data.type === "courses") {
    let id = Date.now()
    data.attributes.id = id
    courses.push(data.attributes)
    res.status(201).json(courses)
  } 
});

coursesRouter.put("/:courseId", (req, res) => {
  const id = parseInt(req.params.courseId)
  const updatedCourse = {
      ...req.body?.data?.attributes,
      id
  }
  courses[req.courseIndex] = updatedCourse
  res.json(updatedCourse)
});

coursesRouter.patch("/:courseId", (req, res) => {
  const id = parseInt(req.params.courseId)
  const updatedCourse = Object.assign(
    {},
    courses[req.courseIndex],
    req.body?.data?.attributes,
    {id}
  )
  courses[req.courseIndex] = updatedCourse
  res.json(updatedCourse)
});

coursesRouter.delete("/:courseId", (req, res) => {
  const deletedCourse = courses[req.courseIndex]
  courses.splice(req.courseIndex, 1)
  res.send(deletedCourse)
});

module.exports = coursesRouter