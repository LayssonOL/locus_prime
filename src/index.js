const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect(
  "mongodb+srv://laysson:m1m0ng0db4tl4s@cluster0-2vrt5.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

app.set("view engine", "pug");
app.set("views", "./views");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../views/signup.html"));
});

const checkSignIn = (req, res, next) => {
  if (req.session.loggedin) {
    next();
  } else {
    var err = new Error("Not logged in!");
    // console.log(req.session.user);
    next(err);
  }
};

app.use("/protected_page", (err, req, res, next) => {
  console.log(err);
  //User should be authenticated! Redirect him to log in.
  res.redirect("/");
});


app.get("/protected_page", checkSignIn, function(req, res) {
  res.render("protected_page", { id: req.session.user.id });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("User logged out.");
  });
  res.redirect("/login");
});


app.use(require("./routes/routes"));

app.use(function(req, res) {
  res.send(404);
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
