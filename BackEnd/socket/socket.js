const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST"],
  },
});

 const getReceiverSocketId = (receiverId) => {
  return usersSocketMap[receiverId];
}

const usersSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    usersSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(usersSocketMap));

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete usersSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(usersSocketMap));
  });
});

module.exports = { app, io, server, getReceiverSocketId };
