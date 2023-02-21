require("dotenv").config();
const session = require("express-session");
const localStrategy = require("passport-local");
const passport = require("passport");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { GetUserDatabase } = require("./databaseHandler");

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
      console.log(user);
      //search DB for user by id and return that table.
      console.log("Deserialize user...");
      connection.query(
        "SELECT * FROM Users WHERE UserID = ?",
        [user[0]],
        function (err, result) {
          if (err) throw err;
          return done(null, result);
        }
      );
    });
  });
};
