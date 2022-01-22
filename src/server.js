import express from "express";
import WebSocket from "ws";
import http from "http";
const app = express();
const PORT = 4000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/*", (req, res) => {
  res.redirect("/");
});

const handleListen = () =>
  console.log(`⏰ Listening on http://localhost:${PORT}`);

//app.listen(PORT, handleListen);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const sockets = [];



wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected from Server ☕");
  socket.on("close", () => console.log("Disconnected from the Browser ❌"));
  socket.on("message", (message) => {
    sockets.forEach(aSocket => aSocket.send(message.toString()));
   
  });
});

server.listen(PORT, handleListen);
