const express = require("express");
const bc = require("bcryptjs");
const router = express.Router();
const Users = require("./model.js");

router.post("/register", (req, res) => {
  Users.register(req.body)
    .then(result => {
      res.status(200).json({ success: `Welcome, ${req.body.username}.` });
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});
router.post("/login", (req, res) => {});
router.get("/users", (req, res) => {});

module.exports = router;
