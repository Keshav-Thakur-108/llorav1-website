const mongoose = require('mongoose')

let gradeSchema = new mongoose.model({
    examDate: Date,
    grade: String
})

module.exports = mongoose.model("Grade", gradeSchema)