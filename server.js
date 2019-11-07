// code away!

const express = require("express"),
  logger = require("./middleware/logger"),
  server = express(),
  path = require("path"),
  apiRoutes = require("./routes"),
  port = process.env.PORT || 5000;
cors = require("cors");
server.use(express.json());
server.use(logger);
server.use(cors());

server.use("/api", apiRoutes);

//Static file declaration:
server.use(express.static(path.join(__dirname, "client/build")));
//production mode:
if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.join(__dirname, "client/build")));
  server.get("*", (req, res) => {
    res.sendFile(path.join((__dirname = "client/build/index.html")));
  });
}
//Build mode:
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

server.listen(port, () => {
  console.log(`Server running on localhost port: ${port}`);
});
