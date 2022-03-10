const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  firstName: {type: String, maxlength: 64, required: true},
  lastName: {type: String, maxlength: 64, required: true},
  nickName: {type: String, maxlength: 64},
  email: {type: String, maxlength: 512, required: true}
})
const Student = mongoose.model("Student", schema)

module.exports = Student