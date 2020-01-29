const express = require("express");
const bc = require("bcryptjs");
const router = express.Router();
const Users = require("./model.js");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./config/jwt.js");

//middleware
const { validBody, restricted } = require("./middleware/user-middleware.js");

router.post("/register", validBody, (req, res) => {
  let user = req.body;
  const hash = bc.hashSync(user.password, 10);
  user.password = hash;

  Users.register(req.body)
    .then(result => {
      res.status(200).json({ success: `Welcome, ${req.body.username}.` });
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.post("/login", validBody, (req, res) => {
  let { username, password } = req.body;

  Users.findUser({ username })
    .first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {
        const token = signToken(user);
        res
          .status(200)
          .json({ Welcome: `Login successful, ${user.username}`, token });
      } else {
        res.status(401).json({ error: "Invalid login" });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get("/users", restricted, (req, res) => {
  Users.fetchUsers()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

function signToken(user) {
  const payload = {
    user
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
