const express = require("express");

const app = express();

app.get("/", function(request, response){
    response.send("Yo")
});

app.get("/contact", function(request, response){
    response.send("<h1>Yo Contact me: 8766XXXX</h1>");
});

app.get("/about", function(request, response){
    response.send("<h1>KAIZOKU ONI OREWA NARU</h1>");
});

app.listen(3000, function(){
    console.log("Server On!");
});