const nodeMailer = require("../config/nodemailer");
/*
newComment = function()
module.exports = newComment
*/
// this is another way of exporting a method // comment coming from comments_controller.js
exports.newComment = (comment) => {
  console.log("inside newComment mailer", comment);

  // declaring that we will be using (mailer template) new_comments.ejs
  let htmlString = nodeMailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );

  // .sendMail is predefined function
  nodeMailer.transporter.sendMail(
    {
      from: "developerop2024@gmail.com",
      to: comment.user.email,
      subject: "New Comment Published!",
      //   html: "<h1>Yup, your comment is now published!</h1>",
      html: htmlString,
    },
    (err, info) => {
      // info carries information about the request that has been sent
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }

      console.log("Message sent", info);
      return;
    }
  );
};
