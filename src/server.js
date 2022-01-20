import http from "http";
import SocketIO from "socket.io";
import express from "express";
// import { SocketAddress } from "net";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  console.log(socket);
});

/*const sockets = [];
const wss = new WebSocket.Server({ httpServer });

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";

  console.log("Connected to Browser ✅"); // broswer 연결 backend 표시

  socket.on("close", () => {
    console.log("Disconnected from Browser ❌");
  }); // frontend 창 닫혔을 시 backend에 표시

  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
      case "nickname":
        socket["nickname"] = message.payload;
    }
  }); // forEach문 돌면서 각 browser에 msg 전송
});
// backend의 socket은 연결된 browser */

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);

// JSON

{
  type: "msg";
  payload: "hello";
}
{
  type: "nick";
  payload: "kang";
}
