const Users = require("./model.js");
const db = require("../../db-config");

describe("User Model", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("test environment", () => {
    it("should use the testing environment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });

  describe("register()", function() {
    it("adds a user to the database", async () => {
      await Users.register({ username: "Toby", password: "McGuire" });
      let users = await db("users");
      expect(users).toHaveLength(1);
    });
  });
  describe("remove()", function() {
    it("deletes a user from the database", async () => {
      await Users.register({ username: "Toby", password: "McGuire" });
      let users = await db("users");
      expect(users).toHaveLength(1);
      await Users.remove(1);
      let usersEmpty = await db("users");
      expect(usersEmpty).toHaveLength(0);
    });
  });
});
