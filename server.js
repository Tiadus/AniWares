//Import
const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');

//Required for body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Get root
app.get('/', function(req, res) {
    res.send("Welcome to the root path!");
});

//Create connection to mysql server
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ngaymai123',
    database: 'AniWares',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

app.listen(4000, function() {
    console.log("Listening on port 4000");
});