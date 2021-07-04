const mongoose = require('mongoose')

let studentSchema = new mongoose.Schema({
    id: String,
    fullName: String,
    email: String,
    faculty: String,
    birthDate: Date,
    grades: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade"
    }
    ]   
})

module.exports = mongoose.model("Student", studentSchema)