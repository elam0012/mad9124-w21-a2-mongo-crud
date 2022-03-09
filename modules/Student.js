// const Student =require("./Student")
const mongoose = require("mongoose")
const Student = mongoose.model("Student", schema)

const schema = new mongoose.Schema({
  firstName: {type: String, maxlength: 64, required: true},
  lastName: {type: String, maxlength: 64, required: true},
  nickName: {type: String, maxlength: 64},
  email: {type: String, maxlength: 512, required: true}
})

module.exports = Student