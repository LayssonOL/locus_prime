const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb+srv://laysson:m1m0ng0db4tl4s@cluster0-2vrt5.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send({
      message: "Hello World!",
    });
});

app.use(cors());

app.use(require('./routes/routes'));

app.use(function(req, res){
  res.send(404);
});

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
