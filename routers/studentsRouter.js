
const express = require("express");
const {students} = require("../data/index");
const validateStudentId = require("../middleware/validateStudentId")

const StudentsRouter = express.Router();
StudentsRouter.use("/:studentId", validateStudentId)

StudentsRouter.get("/", (req, res) => {
  res.json(students);
});

StudentsRouter.get("/:studentId", (req, res) => {
  const id = parseInt(req.params.studentId)
  res.json(students[req.studentIndex])
});

StudentsRouter.post("/", (req, res) => {
  const {data} = req.body
  if (data.type === "students") {
    let id = Date.now()
    data.attributes.id = id
    students.push(data.attributes)
    res.status(201).json(students)
  } 
});

StudentsRouter.put("/:studentId", (req, res) => {
  const id = parseInt(req.params.studentId)
  const updatedStudent = {
      ...req.body?.data?.attributes,
      id
  }
  students[req.studentIndex] = updatedStudent
  res.json(updatedStudent)
});

StudentsRouter.patch("/:studentId", (req, res) => {
  const id = parseInt(req.params.studentId)
  const updatedStudent = Object.assign(
    {},
    students[req.studentIndex],
    req.body?.data?.attributes,
    {id}
  )
  students[req.studentIndex] = updatedStudent
  res.json(updatedStudent)
});

StudentsRouter.delete("/:studentId", (req, res) => {
  const deletedStudent = students[req.studentIndex]
  students.splice(req.studentIndex, 1)
  res.send(deletedStudent)
});

module.exports = StudentsRouter