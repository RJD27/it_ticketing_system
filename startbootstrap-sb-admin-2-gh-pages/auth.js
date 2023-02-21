require('dotenv').config()
const session = require("express-session");
const localStrategy = require("passport-local");
const passport = require("passport")
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");





  

module.exports = function(app) { 
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "PB23Group",
        database: "IT_Ticketing_System"
    })
    

    console.log("Auth.js kicking in!")
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {secure: false}
      }))
    app.use(passport.initialize());
    app.use(passport.session());


    

    con.connect((err)=>{
        console.log("DB connection outside of passport established...")
      
      //localstrategy to search DB for email/password and check if it matches the typed in email/password.
      passport.use(new localStrategy({usernameField: 'email',
      passwordField: 'password'}, function(email,password,done){
        console.log("localstrategy user is...");
        console.log(email);
            var sql = "SELECT * FROM users WHERE Email = ?";
            con.query(sql, [email],function(err, account){
                
                if(err) {
                     return console.log(err);
                }
                if(!account){
                  console.log("No account")
                  return done(null, null);
                }
                con.query("SELECT Password FROM users WHERE Email = ?", [email], function(err, pass){
                  if(err){console.log(err)
                  }
                  if(password !== pass.Password){
                    console.log("Email or password incorrect.")
                    return done(null, null);
                  }
                  return done(null,account);  
                })
            })
        
      }))
      
      passport.serializeUser((user,done)=>{
        console.log("Serialize...")
        done(null, user);
      })
      passport.deserializeUser((user, done)=>{
        //search DB for user by id and return that table.
        console.log("Deserialize...");
            con.query("SELECT * FROM Users WHERE UserID = ?",[user[0].UserID], function(err, result){
                if(err) throw err;
                return done(null,result);
            })
        
      })
      })

}


