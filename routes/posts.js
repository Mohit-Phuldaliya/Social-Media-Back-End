const express = require("express");
const router = express.Router();
const passport = require("passport");

const postsController = require("../controllers/posts_controller");

router.post("/create", passport.checkAuthentication, postsController.create);

// creating route to handle delete post and comments associated with it and checkAuthentication the user should be loged in not everyone can delete it
router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  postsController.destroy
);

module.exports = router;
