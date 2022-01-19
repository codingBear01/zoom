import http from "http";
import WebSocket from "ws";
import express from "express";
import { SocketAddress } from "net";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);

  console.log("Connected to Browser ✅"); // broswer 연결 backend 표시

  socket.on("close", () => {
    console.log("Disconnected from Browser ❌");
  }); // frontend 창 닫혔을 시 backend에 표시

  socket.on("message", (message) => {
    sockets.forEach((aSocket) => aSocket.send(message.toString("utf-8")));
  }); // forEach문 돌면서 각 browser에 msg 전송
});
// backend의 socket은 연결된 browser

server.listen(3000, handleListen);
