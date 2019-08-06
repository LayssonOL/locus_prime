const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb+srv://laysson:m1m0ng0db4tl4s@cluster0-2vrt5.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/views/signup.html'));
});

app.use(cors());

app.use(require('./routes/routes'));

app.use(function(req, res){
  res.send(404);
});

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
