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
