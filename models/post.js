const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    // linking post to the  user
    user: {
      // type is refrence
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
// before exporting this we need to tell that this going to be a model/collenction in DB
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
