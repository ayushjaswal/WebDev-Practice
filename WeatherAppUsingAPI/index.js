const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { readFile } = require("fs");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    console.log("Recieved");

    const apiKey= readFile("apiKey.txt");
    const units = "metric";
    const location = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=" + units +"&appid=" + apiKey; 
    https.get(url, function(response){
        console.log(response);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = " https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is: " + weatherDescription + ".</p>");
            res.write("<h1>The temperature is: " + temp + " degree celcius.</h1>");
            res.write("<img src =" + imgUrl + ">");
            res.send();
        }); 

    });

})


app.listen(3000, function(){
    console.log("Server On!");
});
