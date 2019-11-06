// code away!

const express = require("express"),
  logger = require("./middleware/logger"),
  server = express(),
  apiRoutes = require("./routes");
cors = require("cors");
server.use(express.json());
server.use(logger);
server.use(cors());
server.get("/", (req, res) => {
  res.send(`<h2>Begin by accessing <a href="./api">/api</a></h2>`);
});
server.use("/api", apiRoutes);

server.listen(9000, () => {
  console.log("Server running on localhost:9000");
});
