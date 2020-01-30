const request = require("supertest");
const server = require("../../server.js");

describe("server", () => {
  it("runs the tests", () => {
    expect(true).toBe(true);
  });

  describe("GET /users", () => {
    it("returns 400 code if not logged in", () => {
      return request(server)
        .get("/api/users")
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
    it("returns 401 code if invalid token", () => {
      return request(server)
        .get("/api/users")
        .set("authorization", "token")
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
  });

  describe("POST /register", () => {
    it("returns 400 code if missing user info", () => {
      return request(server)
        .post("/api/register")
        .send({ username: "kyle" })
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
    it("response formatted in json", () => {
      let user = {
        username: "kyle",
        password: "kyle123"
      };
      return request(server)
        .post("/api/register")
        .send(user)
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });
  });

  describe("POST /login", () => {
    it("returns 400 code if missing user info", () => {
      return request(server)
        .post("/api/login")
        .send({ username: "tony" })
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
    it("response uses json", () => {
      return request(server)
        .post("/api/login")
        .send({ username: "tony" })
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });
  });
});
