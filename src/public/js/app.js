const socket = new WebSocket(`ws://${window.location.host}`);
// frontend의 socket은 server로의 연결

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
}); // server에 정상 연결 시 표시

socket.addEventListener("message", (message) => {
  console.log("New Message: ", message.data, " from the Server");
}); // backend에서 온 message 표시

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
}); // backend에서 browser 연결 끊겼을 때 표시

setTimeout(() => {
  socket.send("hello from the browser 🖐");
}, 1000); // backend로 message 전송
