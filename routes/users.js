const express = require("express");
const router = express.Router();

// require passport
const passport = require("passport");

const usersController = require("../controllers/users_controller");

console.log("router loaded");

router.get("/profile", usersController.profile);

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

module.exports = router;
