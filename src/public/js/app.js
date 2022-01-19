const msgList = document.querySelector("ul");
const msgForm = document.querySelector("#msg");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`);
// frontend의 socket은 server로의 연결

function makeMsg(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
}); // server에 정상 연결 시 표시

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  msgList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
}); // backend에서 browser 연결 끊겼을 때 표시

msgForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = msgForm.querySelector("input");
  socket.send(makeMsg("new_message", input.value));
  input.value = "";
});

nickForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMsg("nickname", input.value));
});
