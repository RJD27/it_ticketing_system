require('dotenv').config();

const express = require("express");
const app = express();
const { TryRegisterUser } = require("./js/register");

app.set('views', __dirname);
app.set('view-engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static("./"));
app.use(require('connect-livereload')());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/register.html', (req, res) => {
    res.render('register.html');
});

app.post('/register', async (req, res) => {

    var isUserRegistered = await TryRegisterUser(req.body, res);
    if(!isUserRegistered)
    {
        return res.redirect("./register.html");
    }
    return res.redirect("./login.html");
});

app.listen(3000);