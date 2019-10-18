const request = require("supertest");

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
          .send({name: 'Min'})
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
});
describe("GET /users", () => {
  it("should return 200", () => {
    return request(server)
      .get("/users")
      .then(res => {
          expect(res.status).toBe(200);
      
      });
  });
});
