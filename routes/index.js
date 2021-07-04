const express = require('express')
const router = express.Router()
const path = require('path')
const Student = require('../models/student')

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

router.get('/addStudent', (req, res) => {
    res.render('addStudent')
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