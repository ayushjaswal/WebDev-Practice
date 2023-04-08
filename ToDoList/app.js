const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
const getArr = [];
let k = 0;

mongoose.connect("mongodb://localhost:27017/toDoListDB"); //1

const itemSchema = {
    name: String  //2
};

const listScheme = {
    name: String,
    items: [itemSchema]
}

const Item = mongoose.model("item", itemSchema); //3

const List = mongoose.model("list", listScheme);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//async funtion to delete the value from the database of Mongoose
async function del(rescheck){
    await Item.findByIdAndRemove(rescheck)
};


//geting request from / route
app.get("/", function(req, res){
    if(getArr.length === 0 && k == 0){
            Item.find({}).then((docs)=>{
                docs.forEach(function(it){
                    getArr.push(it);
                })
            })
            k = 1;
            res.redirect("/");
    }
    else{
        res.render("list", {listTitle: "Today", newItemsAdded: getArr});
    }
});
        
app.post("/", function(req, res){
    var itemName = req.body.newItem;
    var listName = req.body.list;
    const item = new Item({
        name: itemName
    });
    if (listName != "Today"){
        List.findOne({name: listName}).then((docs)=>{
            if(docs){
                docs.items.push(item);
                docs.save();
                res.redirect("/" + listName);
            }
            else{
                res.redirect("/" + listName);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    else{
        getArr.push(item);
        item.save();
        res.redirect("/");
    }
});

app.post("/delete", function(req, res){
    var rescheck = req.body.checkbox;
    var listName = req.body.listName;
    if(listName == "Today"){
        Item.findByIdAndRemove(rescheck).exec();
        let index = 0;
        getArr.forEach(function(i){ 
            if(i._id == rescheck){
                getArr.splice(index, 1)
            }
            index++;
        })
        res.redirect("/");
    }
    else{
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: rescheck}}}).then((docs)=>{
            console.log("Deleted");
        })
        res.redirect("/"+listName);
    }
});

app.get("/:customListName", function(req, res){
    const cusLstName = _.capitalize(req.params.customListName);
    var lst = [];
    List.findOne({name: cusLstName}).then((docs)=>{
        if(docs){
            lst = docs.items;
            res.render("list", {listTitle: cusLstName, newItemsAdded: lst});
        }
        else{
            var initLst = new Item();
            const list = new List({
                name: cusLstName,
                items: []
            });
            list.save();
            res.redirect("/" + cusLstName)
        }
    }).catch((err)=>
        {
            console.log(err);
        }
    )
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(3000, function(){
    console.log("Server on!");
});
