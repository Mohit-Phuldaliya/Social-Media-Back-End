const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  // finding post by id, we did req.body.post bcz in comment div we given name post to the hidden input
  Post.findById(req.body.post, function (err, post) {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          // we did req.body.post bcz in comment div we given name post to the hidden input
          user: req.user._id, //passing user who did comment
        },
        function (err, comment) {
          if (err) {
            console.log("error in commenting");
          }
          // if commente get created now adding comment to the post means addi ng comment to the postSchema in comment array
          // we Updating array or comments in postSchema
          post.comments.push(comment); //given by mongoDB
          //whenever i updating something i need to call save after it
          post.save();

          return res.redirect("/");
        }
      );
    }
  });
};
