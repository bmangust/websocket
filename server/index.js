const querystring = require("querystring");
const { Server } = require("socket.io");
const { readFileSync, writeFileSync } = require("fs");
const { request } = require("http");
const http = require("http");

const server = http.createServer((request, response) => {
  const url = request.url;
  console.log(url);
  const params = querystring.parse(url?.split("?")[1]);
  console.log(params);
  response.setHeader("Content-type", "application/json");
  response.end(JSON.stringify(params));
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    // allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const list = [];
let id = 0;

// const io = require("socket.io")(server);
io.on("connection", async (client) => {
  console.log("connected: ", client);
  client.emit("data", list);
  client.on("event", (data) => {
    /* … */
    console.log("event: ", data);
    const nameExists = list.find((el) => el.name === data);
    if (nameExists) return client.emit("error", "name exists");
    list.push({ id: id++, name: data });
    io.emit("data", list);
  });
  client.on("disconnect", () => {
    /* … */
    console.log("disconnect: ", client);
  });
});
server.listen(3000);
