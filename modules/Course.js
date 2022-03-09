
const mongoose = require ("mongoose")
const Course = mongoose.model("Course", schema)

const schema = new mongoose.Schema ({
  code:{type: String, maxlength: 16, required: true},
  title:{type: String, maxlength: 255, required: true},
  description: {type: String, maxlength: 2048,},
  url: {type: String, maxlength: 512},
  students: [{type: mongoose.Schema.Types.ObjectId, ref: "Student"}]
})

module.exports = Course