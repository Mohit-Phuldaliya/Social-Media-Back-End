// server side file
// recieving request for connection we passed socketServer here

module.exports.chatSockets = function (socketServer) {
  // io will be handling the connection
  let io = require("socket.io")(socketServer);

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

      socket.join(data.chatroom);

      io.in(data.chatroom).emit("user_joined", data);
    });
  });
};
