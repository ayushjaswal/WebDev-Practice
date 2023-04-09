require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require('mongoose-encryption');
const { Console } = require('console');

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = mongoose.Schema({
    userName: String,
    userPassword: String
});

userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['userPassword'] }); 

const User = mongoose.model("User", userSchema);

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", function(req, res){
    const username = req.body.username;
    const userpassword  = req.body.password;
    User.findOne({userName: username}).then((docs)=>{
        if(userpassword === docs.userPassword){
            res.render("secrets");
        }
        else{
            console.log("What You doin?!")
        }
    }).catch((err)=>{
        console.log(err);
    });
});

app.get("/", function(req, res){
    res.render("home");
});

app.get("/register", function(req, res){
    res.render("register");
});
app.post("/register", function(req, res){
    const newUser = new User({
        userName: req.body.username,
        userPassword: req.body.password
    });
    newUser.save().then(()=>{
        res.render("secrets");
    }).catch((err)=>{
        console.log(err);
    });
});

app.listen(3000, function(){{
    console.log("Server started");
}});