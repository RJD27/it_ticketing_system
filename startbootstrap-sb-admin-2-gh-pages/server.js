require('dotenv').config();

const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const mysql_connector = require('mysql');
const { validateRegister } = require('./js/validator');

const connection = mysql_connector.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'PB23Group',
    database : 'it_ticketing_system'
});

connection.connect();

app.set('views', __dirname);
app.set('view-engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static("./"));
app.use(require('connect-livereload')());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/register.html', (req, res) => {
    res.render('register.html');
});

app.post('/register', async (req, res) => {

    const {error, value} = validateRegister(req.body);
    
    if (error)
    {
        console.log(error);
        return res.send(error.details);
    }

    console.log("Success");
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        var query = "INSERT INTO users (FirstName, LastName, Email, PasswordHash, Verified) VALUES (?)";
        var values = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            hashedPassword,
            false
        ];

        connection.query(query, [values], function(error)
        {
            if (error) {
                throw error;
            }
        })
    } catch(error) {
        console.log(error.message.concat(" - Registration Failed."));
        res.redirect('/register.html');
    }
});

app.listen(3000);