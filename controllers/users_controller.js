const User = require("../models/user");
const fs = require("fs");
const path = require("path");

// // ****** MANUAL AUTHENTICATION PROFILE PAGE RENDERING ****////
// module.exports.profile = function (req, res) {
//   if (req.cookies.user_id) {
//     User.findById(req.cookies.user_id, function (err, user) {
//       if (user) {
//         return res.render("user_profile", {
//           title: "User Profile",
//           user: user,
//         });
//       } else {
//         return res.redirect("/users/sign-in");
//       }
//     });
//   } else {
//     return res.redirect("/users/sign-in");
//   }
// };
// now this is ready to access by router now that route need to be accessed by my browser

// ****** PASSPORTJS AUTHENTICATION PROFILE PAGE RENDERING ****////
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};
//
//PROFILE FORM UPDATE//
/********** without Async Await **********/
/*
module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    // {name: req.body.name,email: req.body.email} == req.body
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      return res.redirect("back");
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
};
*/
/********** with Async Await and flash message and saving avtar file  **********/

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      // finding the user
      let user = await User.findByIdAndUpdate(req.params.id);
      // calling this uploadedAvatar and passing req. to it so that we r able to read the request or the data from the multi part form
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("***Multer Error:", err);
        }
        // console.log(req.file);
        user.name = req.body.name;
        user.email = req.body.email;

        // if already file present then delete prev. and upload new one and if not then don't do any thing just upload
        if (req.file) {
          if (user.avatar) {
            const avatarPath = path.join(__dirname, "..", user.avatar);
            if (fs.existsSync(avatarPath)) {
              fs.unlinkSync(avatarPath);
            }
          }
          // this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (error) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", Unauthorized);
    return res.status(401).send("Unauthorized");
  }
};
//

//
// render the sign up page
module.exports.signUp = function (req, res) {
  //making accesible sign-up page only when the user is Signed-OUT
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Social | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  //making accesible sign-in page only when the user is Signed-OUT
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "Social | Sign In",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  // check wether password and confirm password are equal or not if not then redirect to signup page
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
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
  // setting up flash object type and message
  req.flash("success", "Logged in Successfully");
  // abov is flash msg
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  // before redirecting we need to logout
  //this function is given to request by passportjs
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // setting up flash object's type and message
    req.flash("success", "You have logged out");
    // abov is flash msg
    return res.redirect("/");
  });
};
