const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});

app.post("/", function(request, response){
    var num1 = Number(request.body.num1);
    var num2 = Number(request.body.num2);

    var result = num1 + num2;

    response.send("The result of the calculation is: " + result);
});

app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, res){
    var mass = Number(req.body.mass);
    var height = Number(req.body.height);

    var result = mass / Math.pow(height, 2);

    res.send("Your BMI is: " + Math.floor(result));
});

app.listen(3000, function(){
    console.log("Server On!");
});