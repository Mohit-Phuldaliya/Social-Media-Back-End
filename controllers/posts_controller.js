const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("error in creating in post");
        return;
      }
      return res.redirect("back");
    }
  );
};

module.exports.destroy = function (req, res) {
  // finding post in DB
  Post.findById(req.params.id, function (err, post) {
    // post.user is initial post's user id which we defined in post schema and .id means converting the object id (._id) into string now both in string
    if (post.user == req.user.id) {
      post.remove();
      //deleting post's comments also by using function .deleteMany() which deletes all the comments based on some query passed
      Comment.deleteMany({ post: req.params.id }, function (err) {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
