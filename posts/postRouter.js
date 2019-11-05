const express = require("express");

const router = express.Router({ mergeParams: true });
const Posts = require("./postDb");
router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(() =>
      res.status(500).json({ errorMessage: "Unable to access database." })
    );
});

router.get("/:postId", validatePostId, (req, res) => {
  Posts.getById(req.params.postId)
    .then(post => {
      res.status(200).json({ post });
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Unable to get that post." });
    });
});

router.delete("/:postId", validatePostId, (req, res) => {
  Posts.remove(req.params.postId)
    .then(post => {
      res.status(202).json({ post });
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Unable to remove post." });
    });
});

router.put("/:postId", validatePostId, (req, res) => {
  const user_id = req.params.id;
  req.body.user_id = user_id;
  const editPost = req.body;
  Posts.update(req.params.id, editPost)
    .then(post => {
      if (post) {
        res.status(201).json(post);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "Unable to add that post to that user." });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  Posts.getById(req.params.postId)
    .then(post => {
      if (post.user_id == req.params.id) {
        next();
      } else {
        res
          .status(500)
          .json({ errorMessage: "That post does not belong to that user." });
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Unable to get that post." });
    });
}

module.exports = router;
