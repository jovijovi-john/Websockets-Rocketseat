var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/http.ts
var import_express = __toESM(require("express"));
var import_http = __toESM(require("http"));
var import_path = __toESM(require("path"));
var import_socket = require("socket.io");
var app = (0, import_express.default)();
app.use(import_express.default.static(import_path.default.join(__dirname, "../public")));
var serverHtpp = import_http.default.createServer(app);
var io = new import_socket.Server(serverHtpp);

// src/websocket.ts
var users = [];
var messages = [];
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("select_room", (data, callback) => {
    console.log(data);
    socket.join(data.room);
    const userInRoom = users.find(
      (user) => user.username === data.username && user.room === data.room
    );
    if (userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      users.push({
        room: data.room,
        username: data.username,
        socket_id: socket.id
      });
    }
    const messagesRoom = getMessagesRoom(data.room);
    callback(messagesRoom);
  });
  socket.on("message", (data) => {
    const message = {
      room: data.room,
      username: data.username,
      text: data.message,
      createdAt: /* @__PURE__ */ new Date()
    };
    messages.push(message);
    io.to(data.room).emit("message", message);
  });
});
function getMessagesRoom(room) {
  const messagesRoom = messages.filter((message) => message.room === room);
  return messagesRoom;
}
