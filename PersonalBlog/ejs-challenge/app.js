
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")

const lodash = require("lodash");

var posts = []
mongoose.connect("mongodb://localhost:27017/blogDB");

const blogSchema = {
  title: {
    type: String,
    // required: [true, 'No title']
  },
  bodyCont: {
    type: String
  }
};

const Blog = mongoose.model("blog", blogSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Welcome to Daily Post, a space where we share our thoughts and ideas on Daily bloging. Our blog is written by Yujas, who has amazing backgroud and is very cool. Our goal is to provide insightful and engaging content that will inspire and inform our readers. From [specific topics covered], to [other topics covered], we aim to create a community where we can explore new ideas and have meaningful conversations. Thanks for stopping by and we hope you enjoy our blog!";
const contactContent = "Scelerisque eleifend donec przetium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  Blog.find({}).then((docs)=>{
    if(docs){
      posts = docs;
      res.render("home", {posts: posts});
      // console.log(docs);
    }
    else{
      console.log("No posts");
    }
  }).catch((err)=>{
    console.log(err);
  })
})

app.get("/posts/:post", function(req, res){
  const reqTitle = req.params.post;
  posts.forEach(function(post){
    const storedTitle = post.title;
    if(lodash.lowerCase(storedTitle) === lodash.lowerCase(reqTitle)){
      res.render("post", {pTitle: storedTitle, pContent: post.bodyCont})
    }
  })
})

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
})

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
})

app.get("/compose", function(req, res){
  res.render("compose");
})

app.post("/compose", function(req, res){
  // var post = {
  //   pTitle: req.body.postTitle,
  //   pContent: req.body.postContent
  // }
  // posts.push(post);
  const newBlog = new Blog({
    title: req.body.postTitle,
    bodyCont: req.body.postContent
  });
  newBlog.save().then((docs)=>{
    res.redirect("/");
  });
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
