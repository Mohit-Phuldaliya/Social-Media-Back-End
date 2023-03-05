//frontend file for socket.io
// creating a class for creating functionality
class ChatEngine {
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
        chatroom: "codeial",
      });

      self.socket.on("user_joined", function (data) {
        console.log("a user joined!", data);
      });
    });
  }
}
