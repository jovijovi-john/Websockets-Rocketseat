import { io } from "./http";

interface RoomUser {
  socket_id: string;
  username: string;
  room: string
}

interface Message {
  room: string;
  username: string;
  text: string;
  createdAt: Date;
}

const users: RoomUser[] = [];
const messages: Message[] = [];

// o socket nesse caso é a representação do cliente no servidor
io.on("connection", (socket) => {
  console.log(socket.id)
  // socket.on("nome_do_evento_a_ser_emitido", (data) => console.log(data))
  socket.on("select_room", (data, callback) => {
    console.log(data)

    // jogando o usuario para uma sala
    socket.join(data.room)

    // verificando se o usuário já estava na sala
    const userInRoom = users.find(
      (user) => user.username === data.username && user.room === data.room
    );

    if (userInRoom) {
      // se o usuário já está na sala, so troca o id do socket dele
      userInRoom.socket_id = socket.id;
    } else {
      // senao, cria um novo usuário e o adicione na room
      users.push({
        room: data.room,
        username: data.username,
        socket_id: socket.id
      })
    }

    const messagesRoom = getMessagesRoom(data.room);
    callback(messagesRoom)
  })

  socket.on("message", data => {
    const message: Message = {
      room: data.room,
      username: data.username,
      text: data.message,
      createdAt: new Date()
    }

    messages.push(message);

    // enviar mensagem para usuários da sala

    // se quer enviar pra todo mundo, usa o IO, se quer so pra um usuario, usa o socket

    io.to(data.room).emit("message", message)
  })

});

function getMessagesRoom(room: string) {
  const messagesRoom = messages.filter(message => message.room === room)
  return messagesRoom;
}
