const Comment = require("../models/comment");
const Post = require("../models/post");
const commentMailer = require("../mailers/comments_mailer");

const commentEmailWorker = require("../workers/comment_email_worker");
const queue = require("../config/kue");

const Like = require("../models/like");

/****************** Without Async Await ******************/
/*
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
          // if commente get created now adding comment to the post means adding comment to the postSchema in comment array
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

module.exports.destroy = function (req, res) {
  // find the comment
  Comment.findById(req.params.id, function (err, comment) {
    if (comment.user == req.user.id) {
      // before deleting comment we need to fetch the post id of the comment bcz we need to go inside that post and find the comment id inside comment array and delete it from there also
      let postId = comment.post;
      comment.remove();
      // after deleting comment we updating that post by postID
      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } }, // pulling out the comment id from the list of comments(array of comments)
        function (err, post) {
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};

*/

/****************** With Async Await ******************/

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      post.save();

      //calling comment_mailer
      comment = await comment.populate("user");
      // commentMailer.newComment(comment);

      // calling worker
      // queue.create == creating a job inside a queue
      let job = queue.create("emails", comment).save(function (err) {
        if (err) {
          console.log("error in sending to the queue", err);
          return;
        }
        console.log("job enqueued", job.id);
      });

      res.redirect("/");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.user == req.user.id) {
      let postId = comment.post;

      // CHANGE :: destroy the associated likes for this comment
      await Like.deleteMany({ likeable: comment._id, onModel: "Comment" });

      comment.remove();

      let post = Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
