//imports
const note_router = require('express').Router();
const fs = require('fs');
const path = require('path');
const db = request('../db/db/.json');
const uuid = require('uuid').v4;
// const { createConnection } = require('net');
const db_path = path.join(__dirname, '../db/db.json');

function getTheNotes() {
    return fs.promises.readFile('../db/db.json', 'utf-8')
        .then(data => JSON.parse(data));
};




//Create get ToDo
note_router.get('/notes', (request, response) => {
    getTheNotes()
    .then(data => {
        response.json(data);
    })
    .catch(err => console.log(err));
});

//Create post ToDo
note_router.post('/notes', (request, response) => {
    getTheNotes()
    .then(data => {
        const new_note= request.body;
        const refrence_id = data.length
        ? data[data.length - 1].id : 0;
        new_note.id = refrence_id + 1;

        data.push(new_note);

        fs.promises.writeFile('../db/dbjson', JSON.stringify(data, null, 2))
            .then(() => response.json(data)).catch(err => console.log(err))
            
    });
        response.json(data);
    });


//Create delete ToDo 
note_router.delete('/notes', (request, response) => {
    getTheNotes()
        .then(notes => {
            const id = request.body.id;
            const obj = notes.find(note => note.id === id);
            const index = notes.indexOf(obj);

            notes.splice(index, 1);

            fs.promises.writeFile('../db/db.json', JSON.stringify(data, null, 2))
                .then(() => {
                // console.log('notes updated successfully!');
                response.json(notes);
                })
            .catch(err => console.log(err));
        });
});
// note_router.get('/notes/:id/:comment', (req, res) => {
//     console.log(request.params.comment);
// });


module.exports = note_router;



