// controller action
module.exports.index = function (req, res) {
  // whenever we want to send back json data we do res.json and 200 means success
  return res.json(200, {
    message: "List of posts",
    posts: [],
  });
};
