module.exports.home = function (req, res) {
  console.log(req.cookies);
  res.cookie("user_id", 25);
  return res.render("home", {
    title: "Home",
  });
};
// this function is similar to function to that action in app.get wala function
