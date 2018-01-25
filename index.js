const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const request = require('request');
const fs = require('fs');
const port = 4000;

//create a server object:

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
})

// Set destination and file name for file uploaded
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

var upload = multer({storage:storage})

app.post('/upload', upload.single("file"), function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.file);
    if (req.file) {
        // call an API to IFC Server to get uploaded file info
        // request('https://jsonplaceholder.typicode.com/posts/1', function(err, res, body) {
        //     console.log(body);
        // });
        res.json({message: "File has been uploaded successfully"});
    }
    else
        res.json({message: "Upload failed"});
})

app.listen(port, function() {
    console.log('Server listening on port:', port);
})