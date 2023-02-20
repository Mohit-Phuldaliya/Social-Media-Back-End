const User = require("../models/user");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (user) {
        return res.render("user_profile", {
          title: "User Profile",
          user: user,
        });
      } else {
        return res.redirect("/users/sign-in");
      }
    });
  } else {
    return res.redirect("/users/sign-in");
  }
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
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in signing up' ");
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
      return res.redirect("back");
    }
  });
};

//
//

// // ************ MANUAL AUTHENTICATION **********
// // sign in and create the session for the user
//
// module.exports.createSession = function (req, res) {
//   // we r going to check wther the user exist if user exist we check wether the password enter is correct by using the user email and password enter in the form to the DB if those two email and password matches then we store the user identity in the COOKIE and send it of to the browser
//   // find the user
//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       console.log("Error in finding user in signing in ");
//       return;
//     }

//     // handle user found
//     if (user) {
//       // handle password which doesn't match
//       if (user.password != req.body.password) {
//         return res.redirect("back");
//       }
//       // handle session creation
//       res.cookie("user_id", user.id);
//       return res.redirect("/users/profile");
//     } else {
//       // handle user not found
//       return res.redirect("back");
//     }
//   });
// };

// ***** Authentication Using Passport ****

module.exports.createSession = function (req, res) {
  return res.redirect("/");
};
