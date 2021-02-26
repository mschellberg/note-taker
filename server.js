// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
// Creates port
const PORT = process.env.PORT || 3001; 

// Creates express server
const app = express();
const notes = require('./Develop/db/db.json'); // Variable for all notes

// "/"" is used as the default page
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
});
// Note.html Route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
});
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/db/db.json"));
});

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    
    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(notes),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}
app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

// Callback for when server is running and is listening on a port
app.listen(3001, () => {
    console.log(`API server now on port ${PORT}!`);
});
