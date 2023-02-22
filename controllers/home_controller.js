const Post = require("../models/post");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie("user_id", 25);

  // find all post
  // this query will return all the post

  //fetching all post with user id only
  //
  // Post.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "SocialMedia Home",
  //     //passing all posts in home views
  //     posts: posts,
  //   });
  // });
  ///

  Post.find({})
    .populate("user") //fetching all post with user object by populating whole user from database using method populated provided by mongoose
    .populate({
      path: "comments",
      populate: {
        // futher populate
        path: "user",
      },
    }) //populatin for showing comments and author of comment
    // we use .exec() to write our callback function
    .exec(function (err, posts) {
      return res.render("home", {
        title: "SocialMedia Home",
        //passing all posts in home views
        posts: posts,
      });
    });
};
// this function is similar to function to that action in app.get wala function
