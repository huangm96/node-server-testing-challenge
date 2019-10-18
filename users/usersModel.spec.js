const usersModel = require("./usersModel.js");
const db = require("../data/dbConfig.js");

describe("users model", () => {
  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("insert()", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should add user to database", async () => {
    const records = await db("users");
    expect(records).toHaveLength(0);

    await usersModel.insert({ name: "Min" });
    const usersRecord = await db("users");
    expect(usersRecord).toHaveLength(1);
  });
});

describe("getAll()", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should return users from database", async () => {
    const usersNum = await db("users");
    expect(usersNum).toHaveLength(0);
    await usersModel.insert({ name: "Min" });
    await usersModel.insert({ name: "Kelly" });
    const usersRecord = await usersModel.getAll();
    expect(usersRecord).toHaveLength(2);
  });
});

describe("remove()", () => {
  it("should remove user from database", async () => {
    await db("users").truncate();
    let records = await db("users");
    expect(records).toHaveLength(0);
    await usersModel.insert({ name: "Min" });
    await usersModel.insert({ name: "Kelly" });
    records = await db("users");
    expect(records).toHaveLength(2);

    await usersModel.remove(2);
    records = await db("users");
      expect(records).toHaveLength(1);
    expect(records).toEqual([{id:1,name:"Min"}])
  });
    afterAll(async () => {
      await db("users").truncate();
    });
;
});
