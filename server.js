const express = require('express');
const path = require('path');
let db = require('./db/db.json')
const fs = require('fs')
const shortid = require('shortid');
// even though this is not a module require is used to tell js to go get this file

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 8080;
// I am using the port from heroku or locally my 8080 port

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
// all the front end stuff

app.get('/', (req, res) => res.sendFile(path.join(__dirname, `./public/index.html`)))
// __dirname of the server.js file
// html routes

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, `./public/notes.html`)))
// routing to /notes

app.get('/api/notes', (req, res) => res.json(db))

app.post('/api/notes', (req,res) => {
    const note = {
        id: shortid.generate(),
        title: req.body.title ,
        text: req.body.text
    }
    console.log(req.body)

    db.push(note)
    fs.writeFile('./db/db.json', JSON.stringify(db), err => {
        err ? console.log(err): console.log("Success!")
        //  ? = if : = else
        res.json(db)

    })


})

// app.delete(`/api/notes/${note.id}`, (req,res))

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));