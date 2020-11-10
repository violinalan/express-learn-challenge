const express = require('express')
const app = express()
const students = require('./students.json')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/students', (req, res) => {
    let nameToSearch = req.query.search
    if(!nameToSearch) {
        res.send(students);
        return;
    }

    let student = students.find(student => student.name === nameToSearch)
    res.send(student);
})

app.get('/students/:studentId', (req, res) => {
    let student = students.find(student => student.id === parseInt(req.params.studentId))
    res.send(student);
})

app.get('/grades/:studentId', (req, res) => {
    let student = students.find(student => student.id === parseInt(req.params.studentId))
    res.send(student.grades);
})

app.post('/grades', (req, res) => {
    let {studentId, grade} = req.body;

    if(!studentId || !grade) {
        res.status(400);
        res.send("Need both studentId and grade");
        return;
    }

    let student = students.find(student => student.id === parseInt(studentId))
    student.grades.push(grade);

    res.status(200);
    res.send(student);
})

app.post('/register', (req, res) => {
    let {name, grades, username, email} = req.body;

    if(!username || !email) {
        res.status(400);
        res.send("Must provide both username and email");
        return;
    }

    let student = {
        id: students.length+1,
        name: name,
        grades: grades,
        username: username,
        email: email
    }

    res.status(200);
    res.send(student);

})

const port = 3003
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))