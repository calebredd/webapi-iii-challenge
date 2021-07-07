const express = require("express");
const router = express.Router();
const Users = require("./userDb");
const Posts = require("../posts/postDb");
// const postRouter = require("../posts/postRouter");

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Unable to access database." });
    });
});

router.post("/", validateUser, (req, res) => {
  const newUser = req.body;

  Users.insert(newUser)
    .then(user => {
      if (user) {
        res.status(201);
        Users.get()
          .then(users => {
            res.status(200).json(users);
          })
          .catch(() => {
            res
              .status(500)
              .json({ errorMessage: "Unable to access database." });
          });
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Unable to add user." });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      // console.log(user.name);
      // console.log({ user });
      res.status(200).json({ user });
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Unable to find that User." });
    });
});

router.get("/:id/posts", validateUserId, validateUserPosts, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(userPosts => {
      res.status(200).json({ userPosts });
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "Unable to find that User's posts." });
    });
});
router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const user_id = req.params.id;
  req.body.user_id = user_id;
  const addPost = req.body;
  Posts.insert(addPost)
    .then(post => {
      if (post) {
        res.status(201);
        Users.getUserPosts(req.params.id)
          .then(userPosts => {
            res.status(200).json(userPosts);
          })
          .catch(() => {
            res
              .status(500)
              .json({ errorMessage: "Unable to find that User's posts." });
          });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "Unable to add that post to that user." });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  const editUser = req.body;
  console.log(editUser);
  Users.update(req.params.id, editUser)
    .then(user => {
      res.status(201);
      Users.getById(req.params.id)
        .then(user => {
          // console.log(user.name);
          // console.log({ user });
          res.status(200).json(user);
        })
        .catch(() => {
          res.status(500).json({ errorMessage: "Unable to find that User." });
        });
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Unable to update user." });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(user => {
      res.status(202).json({ user });
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Unable to remove user." });
    });
});
//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      if (user.id) {
        next();
      } else {
        res.status(500).json({
          errorMessage: "Unable to find that User due to Middleware checking."
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "Unable to find that User due to Middleware checking."
      });
    });
}

function validateUserPosts(req, res, next) {
  Users.getUserPosts(req.params.id)
    .then(userPosts => {
      if (userPosts.length > 0) {
        next();
      } else {
        res.status(500).json({
          errorMessage: "That user does not have any posts."
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "That user does not have any posts."
      });
    });
}

function validatePost(req, res, next) {
  const newPost = req.body;
  if (!newPost.text) {
    res.status(404).send("Unable to add post without text");
  } else {
    next();
  }
}
function validateUser(req, res, next) {
  const newUser = req.body;
  if (!newUser.name) {
    res.status(404).send("Unable to add user without a Name");
  } else {
    next();
  }
}

module.exports = router;
