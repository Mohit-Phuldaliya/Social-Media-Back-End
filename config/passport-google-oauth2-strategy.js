const passport = require("passport");
// using OAuth2Strategy in passport-google-oauth
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "92303529919-ho3oam9gvh8j53q4r880te8vppac5l7t.apps.googleusercontent.com", // <YOUR_GOOGLE_CLIENT_ID>
      clientSecret: "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", //<YOUR_GOOGLE_CLIENT_SECRET>
      callbackURL: "https://localhost:8000/users/auth/google/callback",
    },
    // google generates accessToken and gives it to us
    // in case if ur accessToken expires then you use the refresToken to get new accessToken
    function (accessToken, refreshToken, profile, done) {
      // find a user(matching user in DataBase)
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in google strategy-passport", err);
          return;
        }
        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user) {
          // if found, set this user as req.user
          return done(null, user);
        } else {
          // if not found, create the user and set it as req.user it means sign in that user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "error in creating user google strategy-passport",
                  err
                );
                return;
              }

              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
