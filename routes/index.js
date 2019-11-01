const express = require("express"),
  router = express.Router(),
  userRouter = require("../users/userRouter"),
  auth = require("../middleware/auth");
router.use(auth);
router.get("/", (req, res) => {
  res.send(
    `<h2>Let's write some middleware!</h2> <p>Click here to see a list of <a href="api/users">Users</a></p>`
  );
});
router.get("/lotr", (req, res) => {
  res.status(200).send("You shall pass!");
});
router.use("/users", userRouter);
module.exports = router;
