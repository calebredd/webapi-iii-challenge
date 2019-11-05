const express = require("express"),
  router = express.Router(),
  userRouter = require("../users/userRouter"),
  postRouter=require("../posts/postRouter"),
  Posts=require("../posts/postDb"),
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
router.use("/users/:id/posts", postRouter);
router.get("/posts", (req,res)=>{
  Posts.get().then(posts=>{
    res.status(200).json(posts)
  }).catch(()=>{errorMessage:"Cannot access Posts Database"})
})
module.exports = router;
