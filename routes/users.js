const express = require("express");
const { Passport } = require("passport");
const router = express.Router();

// require passport
const passport = require("passport");

const usersController = require("../controllers/users_controller");

console.log("router loaded");

// // profile page accesible without user signed in
// //
// router.get("/profile", usersController.profile);

// making profile page  accessible only if the user is signed in by using middleware function we created passport.checkAuthentication
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);
// profile update form
router.post(
  "/update/:id",
  passport.checkAuthentication,
  usersController.update
);

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);
// router.post("/create-session", usersController.createSession); // this route for MANUAL AUTHENTICATION

// Authentication using passportjs takes three argumentn one is the middleware(use passport as a middleware to authenticate)
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

router.get("/sign-out", usersController.destroySession);

/**************/

// creating routes for Passport-Google-Auth
// /auht/google is given by passport so this would be /users/auth/google this is not the callback url
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
); // 1st agr = "google"( the startegy) and 2nd arg = scope is the information which we r looking to fetch one profile its an array of string and 2nd email its not part of a profile so if u want email u need to take permission for it

// /auth/google/callback this is the url at which i recieves the data
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

module.exports = router;
