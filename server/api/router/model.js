const db = require("../db-config.js");

module.exports = {
  register,
  findUser,
  fetchUsers
};

function register(credentials) {
  return db("users").insert(credentials);
}

function findUser(credentials) {
  return db("users").where(credentials);
}

function fetchUsers(filter) {
  return db("users")
    .select("username", "department")
    .where("department", filter);
}
