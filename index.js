let express = require("express")
let  fs = require("fs")
let  path = require("path")
let app = express()

const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/database1');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const kittySchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    reason: String
});


const Kitten = mongoose.model('Kitten', kittySchema);



app.use(express.urlencoded({extended : true}))


app.use("/static" , express.static("static"))

app.set("view engine" , "pug")

app.set("views" , path.join(__dirname,"views"));

app.get("/", (req, res)=>{
    res.render("htt.pug")
})

app.get("/demo" , (req,res)=>{
    res.render("httt.pug")
})

app.post("/ff" , (req, res)=>{
    let namee= req.body.name
    let phonee= req.body.phone
    let emaill = req.body.email
    let reason= req.body.reason
    let sos = `The name is : ${namee} , phone number is ${phonee} , email ID is ${emaill} and reason is ${reason}`
    let abcd = fs.writeFileSync("sony.txt" , sos )
    res.send("Form Submitted Successfuly")
    var mydata = new Kitten(req.body);
    mydata.save().then(()=>{
        
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.send("item did not save in the database")
    });
});


app.listen(5500 , ()=>{
    console.log("server hosted")
})