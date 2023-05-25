const socket = io("http://localhost:3000");

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

// enviar para o servidor a sala e o username

// para enviar uma informação -> emit
// para receber ou escutar uma informação -> on

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Olá ${username} - Você está na sala ${room}`

// socket.emit("nome_do_evento_a_ser_emitido", "evento");
socket.emit("select_room", 
  {
    username,
    room
  },
  (response) => {
    response.forEach(data => createMessage(data))
  }
)

document.getElementById("message_input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const message = event.target.value;

    const data = {
      room,
      message,
      username
    }
    socket.emit("message", data);

    event.target.value = ""
  }
});

socket.on("message", (data) => {
  createMessage(data);
})

function createMessage(data) {
   // console.log(data)
   const messageDiv = document.getElementById("messages");

   messageDiv.innerHTML += `
     <div class="new_message">
       <label class="form-label">
         <strong>${data.username}: </strong> ${data.text} - ${dayjs(data.createdAt).format("DD/MM HH:mm")}
       </label>
     </div>
   `
}

document.getElementById("logout").addEventListener("click", (event) => {
  window.location.href = "index.html";
})