
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const auth = require("./auth.js");

const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

auth(app);

app.use(express.static('public'));

//routes
app.get("/", (req,res,next)=>{
  res.sendFile(__dirname + "/index.html")
});

app.get("/login", (req,res)=>{
  res.sendFile(__dirname + "/login.html")
})

app.post("/login", passport.authenticate("local",{failureRedirect: "./login"}), (req,res,next)=>{
  console.log(req.body);
});




app.listen(3000, function(err){
  if(err) console.log(err);
  console.log("Express server starting...")
})


