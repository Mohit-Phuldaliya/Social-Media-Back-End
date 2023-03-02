//frontend file for socket.io
class ChatEngine {
  constructor(chatBoxId, userEmail) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;

    // initiate a connection on port which have i run the socket server
    this.socket = io.connect("http://localhost:5000"); // this says go and connect this io.connect fires an event called connection (emit connect)

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  // this connectionHandler will have the too and fro interaction between the server and user
  connectionHandler() {
    this.socket.on("connect", function () {
      console.log("connection established using sockets...!");
    });
  }
}
