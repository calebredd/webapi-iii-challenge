// code away!

const express = require("express"),
  server = require("./server"),
  app = express();

app.use(server);
app.use(express.json());

app.listen(9000, () => {
  console.log("Server running on localhost:9000");
});
