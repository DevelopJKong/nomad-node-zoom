import express from "express";
import SocketIO from "socket.io";
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

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (msg,done) => {
    console.log(msg);
    setTimeout(() => {
      done();
    }, 1000);
  });
});

httpServer.listen(PORT, handleListen);
