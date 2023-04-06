const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const getArr = [];
let k = 0;

mongoose.connect("mongodb://localhost:27017/toDoListDB"); //1

const itemSchema = {
    name: String  //2
};

const listScheme = {
    name: String,
    items: itemSchema
}

const Item = mongoose.model("item", itemSchema); //3

const List = mongoose.model("list", listScheme);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



//async function to add items from database to array called getArr defined in global scope
async function showDataItem(getArr){
    const get = await Item.find({});
    get.forEach(function(it){
        getArr.push(it);
    })
    k = 1;
};


//async funtion to delete the value from the database of Mongoose
async function del(rescheck){
    await Item.findByIdAndRemove(rescheck)
};


//geting request from / route
app.get("/", function(req, res){
    if(getArr.length === 0 && k == 0){
            showDataItem(getArr);   
            res.redirect("/");
    }
    else{
        res.render("list", {listTitle: "Today", newItemsAdded: getArr});
    }
});
        
app.post("/", function(req, res){
    var itemName = req.body.newItem;
    var listName = req.body.list;
    if (listName != "Today"){
        res.redirect("/" + listName);
    }
    const item = new Item({
        name: itemName
    });
    getArr.push(item);
    item.save();
    res.redirect("/");
});

app.post("/delete", function(req, res){
    const rescheck = req.body.checkbox;
    del(rescheck);
    let index = 0;
    getArr.forEach(function(i){ 
        if(i._id == rescheck){
            getArr.splice(index, 1)
        }
        index++;
    })
    res.redirect("/");
});




function newL(cusLstName){
    var initLst = new Item({
        name: "Sample"
    });
    const list = new List({
        name: cusLstName,
        items: [initLst]
    });
    list.save();
}

async function fndLst(cusLstName, lst){
    var chck = await (List.findOne({name: cusLstName}).exec());
    if(chck){
        console.log(chck.items);
        // chck = chck.items.toArray();
        chck.forEach(function(it){
            lst.push(it);
        })
    }
    else{
        newL(cusLstName);
    }
}

app.get("/:customListName", function(req, res){
    const cusLstName = req.params.customListName;
    const lst = []
    fndLst(cusLstName, lst);
    res.render("list", {listTitle: cusLstName, newItemsAdded: lst});
});


app.get("/about", function(req, res){
    res.render("about");
});

app.listen(3000, function(){
    console.log("Server on!");
});


// const  item1 = new Item({
//     name: "Welcome to your toDo list!"
// });
// const  item2 = new Item({
//     name: "Hit the +  button to add a new item."
// });
// const  item3 = new Item({
//     name: "<-- Hit this to delete the item!"
// });

