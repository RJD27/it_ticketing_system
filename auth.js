require("dotenv").config();

const passport = require("passport");
const session = require("express-session");
const localStrategy = require("passport-local");


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


    passport.use(new localStrategy((user,pass,done)=>{
        //find in database the user/pass and return it IF found, else return errors.
    }))

    passport.serializeUser((user,done)=>{
        done(null, user);
    })
    passport.deserializeUser((id,done)=>{
        //search DB for user by id and return that table.
    })

}

