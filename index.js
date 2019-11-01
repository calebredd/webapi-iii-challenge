// code away!

const express = require("express"),
  logger = require("./logger"),
  server = express();

server.use(express.json());
server.use(logger);
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.listen(9000, () => {
  console.log("Server running on localhost:9000");
});
