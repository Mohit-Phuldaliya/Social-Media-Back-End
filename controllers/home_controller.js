module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Home",
  });
};
// this function is similar to function to that action in app.get wala function
