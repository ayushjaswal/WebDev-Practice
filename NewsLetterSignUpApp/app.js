const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
const { readFile } = require("fs");

client.setConfig({
    apiKey: readFile("filesreq.txt"),
    server: "us10",
  });

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
    
});

app.post("/", function(req, res){
    console.log("Recieved!");
    const firstName = req.body.firstName; 
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data =
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
            }
        };
    const run = async () => {
        var audid = readFile("audId.txt")
        const response = await client.lists.addListMember(audid, data);
        console.log(response);
        if(response.status == "subscribed"){
            res.sendFile(__dirname + "/success.html");
        }
        else if(response.status == 404){
            res.sendFile(__dirname + "/failure.html");
        }
      };
    run();
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server on!");
})

// audience id - 