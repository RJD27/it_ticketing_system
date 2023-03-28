const express = require("express");
const app = express();
const auth = require("./js/auth");
const passport = require("passport");
const { TryRegisterUser } = require("./js/register");
const { doesUserExist } = require("./js/databaseHandler");



app.set("views", __dirname);
app.set("view-engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static("./"));
app.use(require("connect-livereload")());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



auth(app);

//middleware to ensure that a user is authenticated before allowing them at access the app
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get("/auth/github/callback", passport.authenticate("github", {failureRedirect: "/login"}), 
function(req,res){
  res.redirect("/");
})


app.get('/auth/github',
  passport.authenticate('github'));

app.get("/register.html", (req, res) => {
  res.render("register.html");
});

app.post("/register", async (req, res) => {
  console.log(req.body)
  var isUserRegistered = await TryRegisterUser(req.body, res);
  if (!isUserRegistered) {
    return res.send({valid: false})
  }
  return res.send({valid: true})
});

app.get("/check-email", async (req, res) => {
  console.log(req.body)
  var doesUserExist = await doesUserExist(req.body.email);
  if(!doesUserExist){
    res.send({value:false});
  }
  else {
    res.send({value:true})
  }
})

//routes
app.get("/", ensureAuth, (req, res) => {
  console.log(req.body)
  res.render("./index.html");
});

app.get("/login", (req, res) => {
  res.render("./login.html");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "./login" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/logout", function (req, res) {
  req.logout(function (err) {
    res.redirect("/login");
  });
});

app.get("/forgot-password", function (req, res){
  res.render("/forgot-password.html")
})


app.listen(3000, function (err) {
  if (err) console.log(err);
  console.log("Express server starting...");
});
