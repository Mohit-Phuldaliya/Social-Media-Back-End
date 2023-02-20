const express = require("express");
const cookieParser = require("cookie-parser");
const port = 8000;

// connection DB
const db = require("./config/mongoose");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const app = express();

app.use(express.urlencoded()); // reading through the post request

app.use(cookieParser()); // setting up the cookie parser

// setup the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// adding middleware which takes in that session cookie and encrypt it
app.use(
  session({
    // some property need to be set
    name: "codial",
    // to do change the secrete before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      //we need give age to cookie for how long this should be valid after that, that cookie expires that session cookie expires
      maxAge: 1000 * 60 * 100,
    },
  })
);
// we need to tell app to use passport
app.use(passport.initialize());
app.use(passport.session()); //passport also helps in maintaining sessions
// above also included in middleware for session cookie

//
// use express router
app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
    console.log(`Error in runing the server: ${err}`);
  }
  console.log(`Server is runing on port: ${port}`);
});
