const Post = require("../models/post");
const Comment = require("../models/comment");

/********** without Async Await **********/
/*
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
*/
/********** with Async Await **********/
module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    req.flash("success", "Post published !");
    return res.redirect("back");
  } catch (err) {
    // console.log("error in creating in post");
    req.flash("error", err);
    return res.redirect("back");
  }
};

/********** without Async Await **********/

/*
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

*/
/********** with Async Await **********/
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
      req.flash("success", "Post and associated comments deleted !");
      return res.redirect("back");
    } else {
      req.flash("success", "You can not delete this post !");
      return res.redirect("back");
    }
  } catch (err) {
    // console.log("error in creating in post");
    req.flash("error", err);
    return res.redirect("back");
  }
};
