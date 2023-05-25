import express from "express";

import http from "http";
import path from "path";
import { Server } from "socket.io";

// servidor para as rotas
const app = express();
app.use(express.static(path.join(__dirname, "../public")));

// reaproveitando o servidor no server com socket
const serverHtpp = http.createServer(app);

const io =  new Server(serverHtpp);

export { serverHtpp, io }