const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");
// this string has been converted into a path using the path module

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },

    friendships: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friendship",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//
let storage = multer.diskStorage({
  // there's request, and a file from that request and callback dunction cb for cb 1st argument null and the 2nd argument has to be the path the exact path where the file need to be stored current directory where this file is placed and relative to that i am going to find the path of uploads
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    //file.fieldname == avtar
    cb(null, file.fieldname + "-" + Date.now());
  },
});

// static function/methods //

// ataching the diskStorage on multer in the storage property .sinlge() says only one file will uploadede for fieldname avtar not multiple
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
// defining avtarPath i need that AVTAR_PATH to be available publically for the user model
userSchema.statics.avatarPath = AVATAR_PATH;

// these static functions can be accessible by User.uploadedAvtar and User.avtarPath

const User = mongoose.model("User", userSchema);

module.exports = User;
