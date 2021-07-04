const express = require('express')
const router = express.Router()
const Student = require('../models/student')
const Grade = require('../models/grade')



router.get('/', (req, res) => {
    Student.find({}, (err, students) => {
        if(err)
        console.log(err)
        else 
        {

        res.render('index', {students: students})
        }
        
    })
     
})

router.get('/:id/grades', (req, res) => {
    Student.findById(req.params.id).populate("grades").exec((err, foundStudent) => {
        if(err)
        console.log(err)
        else 
        {
            res.render('grades', {grades: foundStudent.grades, id: req.params.id})
        }
        
    })
    
})

router.get('/addStudent', (req, res) => {
    res.render('addStudent')
})

router.get('/:id/addGrade', (req,res) => {
    res.render('addGrade', {id: req.params.id})
})

router.post('/:id/addGrade', (req, res) => {
    Student.findById(req.params.id, (err, foundStudent) => {
        if(err)
        console.log(err)
        else 
        {
            Grade.create({examDate: req.body.examDate, grade: req.body.grade}, (err, newGrade) => {
            if(err)
            console.log(err)
            else 
            {
                newGrade.studentID = req.params.id 
                newGrade.save()
                foundStudent.grades.push(newGrade)
                foundStudent.save()
                res.redirect("/" + req.params.id + "/grades")
            }
        })
        }
        
    })
})

router.get('/:id/updateStudent', (req, res) => {
    Student.findById(req.params.id, (err, foundStudent) => {
        if(err)
        console.log(err)
        else
        res.render('editStudent', {student: foundStudent})
    })
})

router.post('/student/:id', (req, res) => {

    const id = req.body.id
    const fullName = req.body.fullName
    const email = req.body.email
    const faculty = req.body.faculty
    const birthDate = req.body.birthDate

    const updatedStudent = {
        id: id,
        fullName: fullName,
        email: email,
        faculty: faculty,
        birthDate: birthDate
    }

    Student.findByIdAndUpdate(req.params.id, updatedStudent, (err, updatedStu) => {
        if(err)
        console.log(err)
        else
        res.redirect('/')
    })


})

router.post('/addStudent', (req, res) => {
    const id = req.body.id
    const fullName = req.body.fullName
    const email = req.body.email
    const faculty = req.body.faculty
    const birthDate = req.body.birthDate

    const newStudent = {
        id: id,
        fullName: fullName,
        email: email,
        faculty: faculty,
        birthDate: birthDate
    }

    Student.create(newStudent, (err, newStu) => {
        if(err)
        console.log(err)
        else
        res.redirect('/')
    })
})

router.get('/grade/:gradeId/updateGrade', (req, res) => {

    Grade.findById(req.params.gradeId, (err, foundGrade) => {
        res.render('editGrade', {grade: foundGrade})
    })
    
})

router.post('/grade/:gradeId/updateGrade', (req, res) => {
    Grade.findByIdAndUpdate(req.params.gradeId, {examDate: req.body.examDate, grade: req.body.grade}, (err, updatedGrade) => {
        if(err)
        console.log(err)
        else 
        res.redirect("/" + updatedGrade.studentID + "/grades")
    })
})

router.get('/student/:id/delete', (req, res) => {
    Student.findByIdAndDelete(req.params.id, (err) => {
        if(err)
        console.log(err)
        else
        res.redirect('/')
    })
})

router.get('/grade/:gradeId/delete', (req, res) => {
    Grade.findByIdAndDelete(req.params.gradeId, (err, deletedGrade) => {
        if(err)
        console.log(err)
        else
        res.redirect("/" + deletedGrade.studentID + "/grades")
    })
})

router.get('/student/:id/profile', (req, res) => {
    Student.findById(req.params.id, (err, foundStu) => {
        if(err)
        console.log(err)
        else
        res.render('studentInfo', {student: foundStu})
    })
})


module.exports = router