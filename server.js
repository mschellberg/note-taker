// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
// Creates port
const PORT = process.env.PORT || 3001; 
//const apiRoutes = require("./routes/apiRoutes");
//const htmlRoutes = require("./routes/htmlRoutes");
// Creates express server
const app = express();

// * is used as the default page
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
});

// Note.html Route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
});

// Callback for when server is running and is listening on a port
app.listen(3001, () => {
    console.log(`API server now on port ${PORT}!`);
});
