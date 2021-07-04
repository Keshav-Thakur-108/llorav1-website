const express = require('express')
const router = express.Router()
const path = require('path')
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
            console.log(foundStudent.grades)
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
            console.log(foundStudent)
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


module.exports = router