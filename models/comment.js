const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: ture,
    },
    // comment belong to a user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // refered that post
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
