
const express = require("express");
const bodyParser = require("body-parser");
const auth = require("./auth.js");
const passport = require("passport");

const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

auth(app);

app.use(express.static('public'));

//middleware to ensure that a user is authenticated before allowing them at access the app
function ensureAuth(req,res,next){
    
  if(req.isAuthenticated()){
    console.log("Success authenticated")
    next();
  }
  else {
    res.redirect("/login");
  }
}

//routes
app.get("/", ensureAuth, (req,res)=>{
  res.sendFile(__dirname + "/index.html")
});

app.get("/login", (req,res)=>{
  res.sendFile(__dirname + "/login.html")
})

app.post("/login", passport.authenticate("local",{failureRedirect: "./login"}), (req,res)=>{
  console.log(req.body);
  res.redirect("/");
});

app.get("/logout", function(req,res){
  req.logout(function(err){
    
    res.redirect("/login");
  });
})



app.listen(3000, function(err){
  if(err) console.log(err);
  console.log("Express server starting...")
})


