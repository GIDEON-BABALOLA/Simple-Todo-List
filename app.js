const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const myDater = require(__dirname + "/date.js");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const newItems = ["Take Your Bath", "Read Your Bible"];
const secondItems = ["Write Code"]; // Global Varaible
//  constant variable does not mean that the content of an array cannot be changed, it simply means that 
// the array cannot be declared again.
app.get("/", function(req, res){
    res.render("todolist", {typeofday : myDater.myDate(), newcontent : newItems });
})
app.get("/work", function(req, res){
    res.render("worklist", {workday : myDater.myDay(), workcontent:secondItems, mytitle: "Work List"});
})
app.post("/", function(request, response){
    let newItem = request.body.add;
    let secondItem = request.body.second;
    console.log(request.body.list);
    if( request.body.list === "worklist"){
        secondItems.push(secondItem);
        response.redirect("/work");
    }
    else{
    newItems.push(newItem);
    response.redirect("/");
    }
});
app.listen(4000, function(){
    console.log("server is running on port 4000")
})