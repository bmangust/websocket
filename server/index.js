const server = require("http").createServer();
const { Server } = require("socket.io");
const { readFileSync, writeFileSync } = require("fs");

const io = new Server(server, {
  cors: {
    origin: "null",
    // allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const getData = async () => {
  const data = readFileSync("./data.json");
  const json = JSON.parse(data);
  console.log(json);
  if (!json?.data) return [];
  return json.data;
};

// const io = require("socket.io")(server);
io.on("connection", async (client) => {
  console.log("connected: ", client);
  const data = await getData();
  client.emit("data", data);
  client.on("event", (data) => {
    /* … */
    console.log("event: ", data);
  });
  client.on("disconnect", () => {
    /* … */
    console.log("disconnect: ", client);
  });
});
server.listen(3000);
