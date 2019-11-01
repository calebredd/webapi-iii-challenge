//custom middleware
function auth(req, res, next) {
  if (req.url !== "/lotr") {
    next();
  } else {
    res.status(403).send("You shall not pass!");
  }
}

module.exports = auth;
