const Users = require("./model.js");
const db = require("../../db-config.js");

describe("User Model", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
});
