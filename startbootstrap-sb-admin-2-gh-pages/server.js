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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


auth(app);

//middleware to ensure that a user is authenticated before allowing them at access the app
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/register.html", (req, res) => {
  res.render("register.html");
});

app.post("/register", async (req, res) => {
  var {valid, message} = await TryRegisterUser(req.body, res);

  if (valid)
  {
    console.log("Redirecting");
    res.redirect("/login");
    return;
  }
  res.json({valid: valid, message: message});
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
