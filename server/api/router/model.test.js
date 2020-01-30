const Users = require("./model.js");
const db = require("../../db-config.js");

describe("User Model", () => {
  describe("test environment", () => {
    it("should use the testing environment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });
});
