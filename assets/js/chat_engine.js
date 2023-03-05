//frontend file for socket.io
// creating a class for creating functionality

class MyChatEngines {
  constructor(chatBoxId, userEmail) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;

    // initiate a connection on port which have i run the socket server
    // io is the global variable that is available after including cdn socket.io file in home.ejs
    // this says go and connect, this io.connect fires an event called connection (emit connect)
    this.socket = io.connect("http://localhost:5000"); // sendon connect request

    if (this.userEmail) {
      this.connectionHandler(); // calling connectionHandler which detects if the connection has been completed
    }
  }

  // this connectionHandler will have the too and fro interaction between the server and user
  connectionHandler() {
    let self = this;

    // on means detect an event
    this.socket.on("connect", function () {
      console.log("connection established using sockets...!");

      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatroom: "phuldaliya",
      });

      self.socket.on("user_joined", function (data) {
        console.log("a user joined!", data);
      });
    });

    // CHANGE :: send a message on clicking the send message button
    $("#send-message").click(function () {
      let msg = $("#chat-message-input").val();

      if (msg != "") {
        self.socket.emit("send_message", {
          message: msg,
          user_email: self.userEmail,
          chatroom: "phuldaliya",
        });
      }
    });

    self.socket.on("receive_message", function (data) {
      console.log("message received", data.message);

      let newMessage = $("<li>");

      let messageType = "other-message";

      if (data.user_email == self.userEmail) {
        messageType = "self-message";
      }

      newMessage.append(
        $("<span>", {
          html: data.message,
        })
      );

      newMessage.append(
        $("<sub>", {
          html: data.user_email,
        })
      );

      newMessage.addClass(messageType);

      $("#chat-messages-list").append(newMessage);
    });
  }
}
