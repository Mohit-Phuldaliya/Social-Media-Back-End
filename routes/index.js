const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller");

console.log("router loaded");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
// router.use("/comments", require("./comments"));
router.use("/likes", require("./likes"));

//for any futher routes access from here
//router.use('/routerName', require('./routerFile))

// telling main about api folder
router.use("/api", require("./api"));

module.exports = router;
