const express = require('express');
const app = express();

app.get("/message", function(req,res) {
    res.json({message: "Hello World"});
});

app.listen(4000, function() {
    console.log("Listening on port 4000");
});