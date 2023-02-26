const passport = require("passport");
// one we are inpmorting the strategy
const JWTStrategy = require("passport-jwt").Strategy;
// second we are importing a module which will help us extract JWT from the header
const ExtractJWT = require("passport-jwt").ExtractJwt;

// since we r going to be use user as the modle for authentication
const User = require("../models/user");

// while defining jwt strategy we need to have some options one:- encryption, encrypt using some key
let opts = {
  // finding jwt from the header using the below code
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "phuldaliya", // this my encryption and decryption string every encryption goes through this and decryption happens bcz of this if i change it after generating token i will not be able to decrypt that token
};

// telling passport to use jwt strategy
// this use after the user's jwt is generated
passport.use(
  // callback function reads data from jwt payload
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    // finding user based on the information of this jwtPayLoad
    User.findById(jwtPayLoad._id, function (err, user) {
      if (err) {
        console.log("Error in finding user from JWT");
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
