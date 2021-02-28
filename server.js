// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');


// Creates express server
const app = express();
const notes = require('./db/db.json'); // Variable for all notes
app.use(express.static(path.join(__dirname, 'public')));

// "/"" is used as the default page
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// Note.html Route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

function getId(notesArray) {
    let retValue = 0;
    for (let item of notesArray) {
        const itemId = item.id;
        if (itemId > retValue) {
            retValue = itemId;
        }
    } 
    retValue++;
    return retValue;
}

function createNewNote(body, notesArray) {
    let idCounter = getId(notesArray);
    body.id = idCounter;
        notesArray.push(body);
    
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return notesArray;
}
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
}); 

app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, notes);
    res.json(newNote); 
});

app.delete('/api/notes/:id', (req,res) => {
    const idToDelete = Number(req.params.id);
    let notes = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8");
    const noteArray = JSON.parse(notes);
    const arrayToSave = [];
    for (let item of noteArray) {
        if (idToDelete !== item.id) {
            arrayToSave.push(item);
        }
        
    }
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(arrayToSave, null, 2)
    );
});

// Creates port
const PORT = process.env.PORT || 3001; 
// Callback for when server is running and is listening on a port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

