module.exports = {
  restricted,
  validBody
};

function validBody(req, res, next) {
  if (req.body && req.body.username && req.body.password) {
    next();
  } else {
    res.status(400).json({ error: "You are missing required credentials." });
  }
}
