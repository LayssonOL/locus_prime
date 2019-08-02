const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const { PORT = 3000 } = process.env;

const server = require("http").Server(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send({
      message: "Hello World!",
    });
});

app.use(cors());

app.use(require("./routes"));

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
