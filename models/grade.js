const mongoose = require('mongoose')

let gradeSchema = new mongoose.Schema({
    examDate: Date,
    grade: String,
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }
})

module.exports = mongoose.model("Grade", gradeSchema)