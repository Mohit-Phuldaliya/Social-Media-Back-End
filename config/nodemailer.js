const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

// Defining Tranporter and attaching to nodemailer
// tansporter is the part which semds emails so this is path which defines how communications takes place

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587, // 587 bcz we using TLS
  secure: false,
  // u have to establish the identity with which u will be sending that email bcz if u don't establish  that identity anyone could use gmail to send mail from anyone to anyone so that gmail tracks ur activity and if u spaming people and using in proper manner then they can block u
  auth: {
    user: "developerop2024@gmail.com",
    pass: "@Developerop2024",
  },
});

// renderTemplate used when we going to send an html emails
// now we want to define that we will be using ejs or the template rendering engine
// relativePath =  from where the mail bieng send or this function is bieng called
let renderTemplate = (data, relativePath) => {
  // defining a variable where i store what all html is going to be sent in that mail
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering template");
        return;
      }
      mailHTML = template;
    }
  );

  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
