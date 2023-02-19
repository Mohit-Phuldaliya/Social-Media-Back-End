const express = require("express");
const cookieParser = require("cookie-parser");
const port = 8000;

const db = require("./config/mongoose");

const app = express();

app.use(express.urlencoded()); // reading through the post request

app.use(cookieParser()); // setting up the cookie parser

// use express router
app.use("/", require("./routes/index"));
// setup the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
    console.log(`Error in runing the server: ${err}`);
  }
  console.log(`Server is runing on port: ${port}`);
});
