const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// authentication using passport
// we r telling passport to use local strategy
passport.use(
  new LocalStrategy(
    {
      // where we defining what is the usernameField it is a syntax
      usernameField: "email",
    }, // in next part there is a function which uses three arguments email, password and done
    // done is my call back function which is reporting back to the passportjs
    function (email, password, done) {
      // whenever passport is bieng called email and password are automatically being passed to it
      //find the user establish the identy
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("error in finding use --> Passport");
          return done(err);
        }

        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }
        // if user found
        return done(null, user);
      });
    }
  )
);

// serializing the user to decide which key is to be kept in the cookie
// that is when the user sign in we find the id and send it to the cookie and the cookie send to the browser
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserializing the user from the key in the cookies
// when browser makes the request so we deserialized it and find the use again
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding use --> Passport");
      return done(err);
    }
    return done(null, user);
  });
});

// not exporting the passport local strategy we exporting the passport
module.exports = passport;
