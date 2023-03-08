const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const auth = require("./js/auth");
const passport = require("passport");
const { TryRegisterUser } = require("./js/register");

app.set("views", __dirname);
app.set("view-engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static("./"));
app.use(require("connect-livereload")());
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
  var isUserRegistered = await TryRegisterUser(req.body, res);
  if (!isUserRegistered) {
    return res.redirect("./register.html");
  }
  return res.redirect("./login.html");
});

//routes
app.get("/", ensureAuth, (req, res) => {
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

app.listen(3000, function (err) {
  if (err) console.log(err);
  console.log("Express server starting...");
});
