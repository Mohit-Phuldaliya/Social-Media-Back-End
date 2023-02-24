const Post = require("../models/post");
const User = require("../models/user");

/********** without Async Await **********/
// //
// module.exports.home = function (req, res) {
//   // console.log(req.cookies);
//   // res.cookie("user_id", 25);

//   // find all post
//   // this query will return all the post

//   /*
//   fetching all post with user id only

//   Post.find({}, function (err, posts) {
//     return res.render("home", {
//       title: "SocialMedia Home",
//       //passing all posts in home views
//       posts: posts,
//     });
//   });
//   */

//   Post.find({})
//     .populate("user") //fetching all post with user object by populating whole user from database using method populated provided by mongoose
//     .populate({
//       path: "comments",
//       populate: {
//         // futher populate
//         path: "user",
//       },
//     }) //populatin for showing comments and author of comment
//     // we use .exec() to write our callback function
//     .exec(function (err, posts) {
//       // finding all users
//       User.find({}, function (err, users) {
//         return res.render("home", {
//           title: "SocialMedia Home",
//           //passing all posts in home views
//           posts: posts,
//           //passing all users in home views
//           all_users: users,
//         });
//       });
//     });
// };
// //
// this function is similar to function to that action in app.get wala function

/********** with Async Await **********/
// 1st we tell server that its a async function

module.exports.home = async function (req, res) {
  //using try catch to handle error
  try {
    let posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    //the successful response stored in posts   // once this executed

    // then this will executed
    let users = await User.find({});
    //successful response stored in users

    // then we return something to the browser
    return res.render("home", {
      title: "SocialMedia Home",
      //passing all posts in home views
      posts: posts,
      //passing all users in home views
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
