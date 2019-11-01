const express = require("express");
const router = express.Router();
const Users=require("./userDb");
const postRouter = require("../posts/postRouter");
router.post("/", (req, res) => {});

// router.post('/:id/posts', (req, res) => {

// });

router.get("/", (req, res) => {
  res.send("<h2>Hello I'm a user</h2>")
});

router.get("/:id", (req, res) => {});

// router.get('/:id/posts', (req, res) => {

// });

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});
router.use("/:id/posts", postRouter);
//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
