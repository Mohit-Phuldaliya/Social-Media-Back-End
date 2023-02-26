const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

// controller action
module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
  // whenever we want to send back json data we do res.json and 200 means success
  return res.json(200, {
    message: "List of posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
      return res.json(200, {
        message: "Post and assosciated comments deleted successfully",
      });
    } else {
      return res.json(401, {
        message: "you can not delete this post",
      });
    }
  } catch (err) {
    // console.log("error in creating in post");
    console.log(err);
    return res.json(500, {
      message: "internal server error",
    });
  }
};
