const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

const expressLayouts = require("express-ejs-layouts");
// telling app to use layouts
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// need to tell in which folder app should look for static file
app.use(express.static("./assets"));

// connection DB
const db = require("./config/mongoose");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

//setting mongo-store it reequires an argument session (express session) bcz u need to store the session information in the
// const MongoStore = require("connect-mongo")(session);
const connectMongo = require("connect-mongo");
const MongoStore = connectMongo(session);

// Requiring SASS
const sassMiddleware = require("node-sass-middleware");
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

// Flash Messages
const flash = require("connect-flash");
// custom middleware for flash msges
const customMware = require("./config/middleware");

app.use(express.urlencoded()); // reading through the post request

app.use(cookieParser()); // setting up the cookie parser

// make the uploads path available to browser
// directory of index.js joins with uploads which means which means SOCIAL BACK_END/uploads is available on this path(/uploads)
app.use("/uploads", express.static(__dirname + "/uploads"));

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
    store: new MongoStore(
      // set up mongo Store
      //mongo store is used to store the session cookie in the db
      {
        // setting mongoose connection so it interact with mongoose
        mongooseConnection: db,
        // do i want to remove this automatically ? no.
        autoRemove: "disabled",
      }, // now there's a callback function in case the connection is not established
      function (err) {
        console.log(err || "connect--mongodb setup ok");
      }
    ),
  })
);
// we need to tell app to use passport
app.use(passport.initialize());
app.use(passport.session()); //passport also helps in maintaining sessions
// above also included in middleware for session cookie

//flash messages setting up
app.use(flash());
// using middleware for flash msges
app.use(customMware.setFlash);

//set up the user uses
app.use(passport.setAuthenticatedUser);

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
