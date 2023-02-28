const queue = require("../config/kue");

const commentsMailer = require("../mailers/comments_mailer");

// Process function
// queue.process('type of queue = name of queue', function(job))

queue.process("emails", function (job, done) {
  console.log("emails worker is proceesing a job", job.data);
  // job.data the data which sent here is the comment
  commentsMailer.newComment(job.data);
  done();
}); // process function calls the mailer
