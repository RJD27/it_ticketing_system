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
    

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {secure: false}
      }))
    app.use(passport.initialize());
    app.use(passport.session());


    

    con.connect((err)=>{
      //localstrategy to search DB for email/password and check if it matches the typed in email/password.
      passport.use(new localStrategy({usernameField: 'email',
      passwordField: 'password'}, function(email,password,done){
            var sql = "SELECT * FROM users WHERE Email = ?";
            con.query(sql, [email],function(err, account){
                if(err) {
                     return console.log(err);
                }
                if(!account){
                  return done(null, false);
                }
                con.query("SELECT Password FROM users WHERE Email = ?", [email], function(err, pass){

                  if(err){console.log(err)
                  }
                  
                  if(!bcrypt.compareSync(password !== pass[0].Password)){
                    return done(null, false);
                  }
                  return done(null,account);  
                })
            })
      }))
      
      passport.serializeUser((user,done)=>{
        done(null, user);
      })
      passport.deserializeUser((user, done)=>{
        //search DB for user by id and return that table.
            con.query("SELECT * FROM Users WHERE UserID = ?",[user[0].UserID], function(err, result){
                if(err) throw err;
                return done(null,result);
            })
        
      })
      })

}


