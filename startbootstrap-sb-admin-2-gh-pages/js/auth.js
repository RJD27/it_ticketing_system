require("dotenv").config();
const session = require("express-session");
const localStrategy = require("passport-local");
const passport = require("passport");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { GetUserDatabase, AddUserToDatabase } = require("./databaseHandler");
const GitHubStrategy = require('passport-github2').Strategy;


module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const connection = GetUserDatabase(mysql);

  console.log("Auth.js kicking in!");
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  connection.connect((err) => {
    if (err) {
      return console.log(err);
    }
    console.log("DB connection outside of passport established...");


    //github strategy


    passport.use("github",
      new GitHubStrategy({
        //don't want to lose this when pushing so maybe in official app we can put this in ENV?
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback"
      }, 
      function(accessToken, refreshToken, profile, cb){
        // Added emails check.
        if (profile.emails < 1)
        {
          return console.log("There are no public emails on this account");
        }
        var check = "SELECT 1 FROM users WHERE Email = ?";
        connection.query(check, [profile.emails[0].value], function(err, user){
        console.log("connection query for git")
        console.log(user)

          if(err){
            return console.log(err);
          }
          if(user < 1){
            console.log("No user...")

         
            AddUserToDatabase(
              connection,
              profile.username,
              profile.username,
              profile.emails[0].value
            )
            /*connection.query("INSERT INTO Users (UserID, FirstName) Values (?,?)",[profile.id, profile.emails[0].value], function(err,users){
              if(err){return console.log(err)}
              return cb(err,users);
            })
            */
            return cb(null, user)

            
          }
          
          return cb(null, user)
        }) 
      })
    )

    //localstrategy to search DB for email/password and check if it matches the typed in email/password.
    passport.use(
      new localStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        function (email, password, done) {
          console.log("localstrategy user is...");
          console.log(email);

          var sql = "SELECT 1 FROM users WHERE Email = ?";
          connection.query(sql, [email], function (err, accounts) {
            if (err) {
              return console.log(err);
            }
            if (accounts.length < 1) {
              console.log("No account found.");
              return done(null, null);
            }
            connection.query(
              "SELECT PasswordHash FROM users WHERE Email = ?",
              [email],
              function (err, results) {
                if (err) {
                  return console.log(err);
                }
                if (!bcrypt.compareSync(password, results[0].PasswordHash)) {
                  console.log("Email or password incorrect.");
                  return done(null, null);
                }
                return done(null, accounts[0]);
              }
            );
          });
        }
      )
    );

    passport.serializeUser((user, done) => {
      console.log("Serialize user...");
      done(null, user);
    });
    passport.deserializeUser((user, done) => {
      //search DB for user by id and return that table.
      console.log("Deserialize user...");
      connection.query(
        "SELECT * FROM Users WHERE UserID = ?",
        [user[0]].toString(),
        function (err, result) {
          if (err) throw err;
          return done(null, result);
        }
      );
    });
  });
};
