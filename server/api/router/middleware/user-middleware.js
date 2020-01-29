module.exports = {
  restricted,
  validBody
};

const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/jwt.js");

function validBody(req, res, next) {
  if (req.body && req.body.username && req.body.password) {
    next();
  } else {
    res.status(400).json({ error: "You are missing required credentials." });
  }
}

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: "Not authorized" });
      } else {
        req.user = { department: decodedToken.department };
        next();
      }
    });
  } else {
    res.status(400).json({ error: "You shouldn't have come here.." });
  }
}
