const usersModel = require('./usersModel.js');
const db = require('../data/dbConfig.js')

describe('users model', () => {
    it('should set testing environment', () => {
       expect(process.env.DB_ENV).toBe("testing");
    })
})

describe('insert()', () => {

    beforeEach(async () => {
        await db('users').truncate();
})

    it('should add user to database', async () => {
        const records = await db('users');
        expect(records).toHaveLength(0);

        await usersModel.insert({ name: "Min" });
        const usersRecord = await db('users');
        expect(usersRecord).toHaveLength(1);
    })
})

describe("getAll()", () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    it('should return users from database', async() => {
        const usersNum = await db('users');
        expect(usersNum).toHaveLength(0);
    })
})