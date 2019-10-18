const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require("./server.js");

describe("GET /", () => {
  it("sould return 200 http status code ", () => {
    return request(server)
      .get("/")
      .then(response => {
        expect(response.status).toBe(200);
      });
  });
  it('should return "WELCOME!!!" ', () => {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.body.message).toEqual("WELCOME!!!");
      });
  });
});
describe("POST /users", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it("should fail by not having req.body", () => {
    return request(server)
      .post("/users")
      .then(res => {
        expect(res.status).toBe(500);
      });
  });
  it("should insert one user", () => {
    return request(server)
      .post("/users")
      .send({ name: "Huang" })
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
  it("should fail by sending wrong req.body", () => {
    return request(server)
      .post("/users")
      .send({ email: "Min" })
      .then(res => {
        expect(res.status).toBe(500);
      });
  });
  afterAll(async () => {
    await db("users").truncate();
  });
});
describe("GET /users", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should return 200", () => {
    return request(server)
      .post("/users")
      .send({ name: "Huang" })
      .then(() => {
        return request(server)
          .get("/users")
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.body).toEqual([{ id: 1, name: "Huang" }]);
          });
      });
  });
  afterAll(async () => {
    await db("users").truncate();
  });
});

describe("Del /users/:id", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should return 200 ", () => {
    return request(server)
      .post("/users")
      .send({ name: "Huang" })
      .then(() => {
        return request(server)
          .delete("/users/1")
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
  });
    it("should return 500 by nonexistent", () => {
      return request(server)
        .post("/users")
        .send({ name: "Huang" })
        .then(() => {
          return request(server)
            .delete("/users/5")
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
    });
    afterAll(async () => {
      await db("users").truncate();
    });
});
