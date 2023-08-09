const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const myDater = require(__dirname + "/date.js");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/TODO-LIST", {useNewUrlParser: true}, {useUnifiedTopology:true })
const itemSchema = new mongoose.Schema({
    name : String
})
const itemModel = mongoose.model("Item", itemSchema);
const workModel = mongoose.model("workItem", itemSchema);
const item1 = new itemModel({
    name : "Take Your Bath"
});
const item2 = new itemModel({
    name : "Read Your Bible"
})
const item3 = new itemModel({
    name : "Go To Class"
})
const workItem1 = new workModel({
    name: "Write Code Today"
})
const workItem2 = new workModel({
    name : "Study Code Today"
})
const workArray = [workItem1, workItem2]
const itemsArray = [item1, item2, item3]
const customSchema = new mongoose.Schema({
    name : String,
    item : [itemSchema]
})
const customModel = mongoose.model("customItem", customSchema)
app.get("/", function(req, res){
itemModel.find()
.then((data)=>{
    if(data.length === 0){
        itemModel.insertMany(itemsArray)
        .then(()=>{
            console.log("Successful Inserted The Items");
        })
        .catch((error)=>{
            console.log("Error In Inserting the items" +error);
        })
        res.redirect("/")
    }
    else{
        res.render("todolist", {typeofday : myDater.myDate(), newcontent :  data});
    }
    })
.catch((error)=>{
    console.log("Error in rendering data", error)
})
})
app.get("/work", function(req, res){
workModel.find()
.then((datar)=>{
    if(datar.length === 0){
        workModel.insertMany(workArray)
        .then(()=>{
            console.log("Successful Inserted The Work Items");
        })
        .catch((error)=>{
            console.log("Error In Inserting the Work items" +error);
        })
        res.redirect("/work")
    }
    else{
        res.render("worklist", {workday : myDater.myDay(), workcontent:datar, mytitle: "Work List"});
    }
    })
.catch((error)=>{
    console.log("Error in rendering data", error)
})
    
})
// 8540784644 Adeogo Emmanuel
app.post("/", function(request, response){
    const newItem = request.body.add;
    console.log(request.body.list);
    const newAdd = request.body.list
    const addValue = request.body.add
    const second = request.body.second
    const newBot = new itemModel({
    name : addValue
    })
    if( request.body.list === "worklist"){
        const workAdd = new workModel({
            name : second
        })
        workAdd.save()
        response.redirect("/work")
    }
    else if (request.body.list === myDater.myDate()){
        const itemAdd = new itemModel({
            name : newItem
        })
        itemAdd.save();
    response.redirect("/");
    }
    else{  
        customModel.findOne({name : request.body.list})
        .then((data)=>{
            console.log(data)
           data.item.push(newBot)
           data.save()
           response.redirect("/" + newAdd)
        })
.catch((error)=>{
    console.log("error in finding customModel", error)
})
    }
});
app.post("/delete", (request, response)=>{
    console.log(request.body.malt)
    const newUpdate = request.body.malt
    const itemDel = request.body.checkbox
    if( newUpdate === myDater.myDate()){
    itemModel.findByIdAndRemove(itemDel)
    .then(()=>{
        console.log("successfully deleted one item")
    })
    .catch((error)=>{
        console.log("unsuccessful in deleting an item", error)
    })
    response.redirect("/")
}
//#14171b
    else{
customModel.findOneAndUpdate({name: newUpdate}, {$pull : {item : {_id : itemDel}}})
.then(()=>{
    console.log("Success in deleting CustomList Data")
    response.redirect("/" + newUpdate)
})
.catch((error)=>{
    console.log("Error in deleting custom list data")
})
    }
})
app.post("/workdelete", (request, response)=>{
    const workDel = request.body.worker
        workModel.findByIdAndRemove(workDel)
        .then(()=>{
            console.log("successfully deleted one work item")
        })
        .catch((error)=>{
            console.log("unsuccessful in deleting an work item", error)
        })
        response.redirect("/work")
    })
    app.get("/:value", (request, response)=>{
        const customListName = request.params.value;
        customModel.findOne({name :customListName})
.then((customData)=>{
if(!customData){
    const customList = new customModel({
        name : customListName,
        item : itemsArray
    })
    customList.save()
response.redirect("/" + customListName)
}
else{
    response.render("todolist", {typeofday : customData.name, newcontent :  customData.item});
}
})
.catch((error)=>{
console.log("Error in finding custom list name", error)
})
    })
app.listen(4000, function(){
    console.log("server is running on port 4000")
})
