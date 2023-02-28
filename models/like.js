const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    // like belongs to the user
    user: {
      type: mongoose.Schema.ObjectId,
    },
    // i need to store two things the type on which the like has been place and the object id on which the like has been placed type could be post or comment and object id could be of that post or that comment
    // this defines the object id of the liked object
    likeable: {
      type: mongoose.Schema.ObjectId,
      require: true,
      // telling dynamic refrence // refPath decides which other property that is the type of object
      refPath: "onModel",
    },
    // this field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"], // either post or comment
      //indicates that a likeable can be a post or a comment
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
