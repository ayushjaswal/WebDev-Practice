const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const { StringDecoder } = require("string_decoder");
const _ = require("lodash");


mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.route("/articles")
    .get(function(req, res){
        Article.find().then((docs)=>{
            res.send(docs) 
        }).catch((err)=>{
            console.log(err);
        })
    })
    .post(function(req, res){
        const newArticle = new Article({
            title: _.startCase(req.body.title),
            content: _.startCase(req.body.content)
        });
        newArticle.save().then(()=>{
            res.send("Successfully added a new article.");
        }).catch((err)=>{
            res.send(err);
        });
    })
    .delete(function(req, res){
        Article.deleteMany().then(()=>{
            res.send("Deleted Many");
        }).catch((err)=>{
            res.send(err)
        });
    });

app.route("/articles/:articleName")
    .get(function(req, res){
        Article.findOne({title: _.startCase(req.params.articleName)}).then((docs)=>{
            if(docs){
                res.send(docs);
            }
            else{
                res.send("Not Found!");
            }
        }).catch((err)=>{
            console.log(err);
        })
    })
    .put(function(req, res){
        Article.findOne({title: _.startCase(req.params.articleName)}, {overwrite: true}).then((docs)=>{
            docs.title = _.startCase(req.body.title);
            docs.content = req.body.content;
            docs.save();
            res.send(docs);
        }).catch((err)=>{
            console.log("Bhai ye kya kr raha h tu?!");
        })
    })
    .patch(function(req, res){
        Article.findOne({title: _.startCase(req.params.articleName)}).then((docs)=>{
            docs.title = _.startCase(req.body.title);
            docs.content = req.body.content;
            docs.save();
            res.send(docs);
        }).catch((err)=>{
            console.log("Bhai ye kya kr raha h tu?!");
        })
    })
    .delete(function(req, res){
        Article.deleteOne({title: _.startCase(req.params.articleName)}).then(()=>{
            res.send("Deleted " + req.params.articleName);
        }).catch((err)=>{
            res.send(err)
        });
    });

app.listen(3000, function() {
  console.log("Server started on port 3000");
})