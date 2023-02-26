const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  try {
    // finds the user
    let user = await User.findOne({ email: req.body.email });
    // if have user not found
    if (!user || user.password != req.body.password) {
      // error code 422 = invalid input by the user
      return res.json(422, {
        message: "Invalid username or password",
      });
    }

    // if use has been found return the response with a message and saying that there's token along side
    return res.json(200, {
      message: "Sign in successful, here is your token, please keep it safe!",
      data: {
        // passing token using jwt library so the user.toJSON() part is get encrypted
        token: jwt.sign(user.toJSON(), "phuldaliya", { expiresIn: "10000" }),
      },
    });
  } catch (err) {
    console.log("********", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
