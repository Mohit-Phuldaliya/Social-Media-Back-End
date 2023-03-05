// server side file
// recieving request for connection we passed socketServer here

module.exports.chatSockets = function (socketServer) {
  // io will be handling the connection
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "http://localhost:8000",
      credentials: true,
    },
    // The reason for adding this code is to enable Cross-Origin Resource Sharing (CORS) between the frontend application running on port 8000 and the backend server running on port 5000.
    // By default, browsers restrict cross-origin requests, which means that a web application running on one domain (e.g., http://localhost:8000) cannot normally access resources on another domain (e.g., http://localhost:5000). To allow cross-origin requests, the server must explicitly set the Access-Control-Allow-Origin header
  });

  // whenever a connection request recieves it automatically will send back and acknowledgement to the frontend in connectionHandler automatically
  io.sockets.on("connection", function (socket) {
    // socket is an object with a lot of properties of the user which is sending
    console.log("new connection received", socket.id);

    // whenever a client disconnect an  automatic disconnect event will fire
    socket.on("disconnect", function () {
      console.log("socket disconnected!");
    });

    socket.on("join_room", function (data) {
      console.log("joining request rec.", data);

      socket.join(data.chatroom); // if chatroom with name data.chatroom exist already then user is connected or enter into that chatroom if it doesnot exist it will creat chatroom and enter the use into it

      io.in(data.chatroom).emit("user_joined", data); //telling chatroom that user enter in the chat room
    });

    // CHANGE :: detect send_message and broadcast to everyone in the room
    socket.on("send_message", function (data) {
      io.in(data.chatroom).emit("receive_message", data);
    });
  });
};
