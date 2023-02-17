module.exports.profile = function (req, res) {
  return res.end("<h1>User Profile</h1>");
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
  // to do
};

// sign in and create the session for the user
module.exports.createSession = function (req, res) {
  // to do
};
