const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.end("<h1>User Profile</h1>");
};
// now this is ready to access by router now that route need to be accessed by my browser

// render the sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Social | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Social | Sign In",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  // check wether password and confirm password are equal or not if not then redirect to signup page
  if (req.body.password != req.body.confirm_password) {
    return req.redirect("back");
  }

  // try to find out the user id if it is exist then we does not create it and if it is does not exist then we create it
  User.findOne({ name: req.body.name }, function (err, user) {
    if (err) {
      console.log("Error in finding user in signing up'");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      //when user is already present
      return req.redirect("back");
    }
  });
};

//
//

// sign in and create the session for the user
module.exports.createSession = function (req, res) {
  // to do
};
