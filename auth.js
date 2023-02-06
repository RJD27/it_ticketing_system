require('dotenv').config()



const passport = require("passport");
const session = require("express-session");
const localStrategy = require("passport-local");
const mysql = require("mysql");



const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "PB23Group",
    database: "ticketsystem"
  })
  
  


  

module.exports = function(app) { 
    console.log("Auth.js kicking in!")
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {secure: false}
    }))
    app.use(passport.initialize());
    app.use(passport.session());


    con.connect(function(err){
        if(err) console.log(err);
        console.log("DB Connected...");
        var sql = "INSERT INTO Users (FirstName) VALUES ('Eric')";
        con.query(sql, function(err, result){
            if(err) console.log(err);
            console.log(result);
        })
      });

    passport.use(new localStrategy((user,pass,done)=>{
        
    }))

    passport.serializeUser((user,done)=>{
        done(null, user);
    })
    passport.deserializeUser((id,done)=>{
        //search DB for user by id and return that table.
    })

}

