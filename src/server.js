import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("Connected to Browser ✅"); // broswer 연결 backend 표시

  socket.on("close", () => {
    console.log("Disconnected from Browser ❌");
  }); // frontend 창 닫혔을 시 backend에 표시

  socket.on("message", (message) => {
    console.log(message.toString("utf-8"));
  }); // frontend에서 온 message 표시

  socket.send("hello!"); // frontend에 message 전송
});
// backend의 socket은 연결된 browser

server.listen(3000, handleListen);
