import app from "../src/app";
import dbInit from "../src/db/init";
import { sequelize } from "../src/db/config";
import * as Password from "../src/utils/password";
import * as userService from "../src/db/services/user-service";

const supertest = require('supertest');

const request = supertest(app);

describe("App", function () {
    beforeAll(async function () {
        await dbInit();
    });

    afterAll(async function () {
        await sequelize.close();
    });

    beforeEach(async function () {
        await sequelize.query("SET FOREIGN_KEY_CHECKS=0");
        await sequelize.truncate({cascade: true});
        await sequelize.query("SET FOREIGN_KEY_CHECKS=1");
    });

    async function createUser(id: string, password: string) {
        const hash = await Password.getHash(password);
        const user = await userService.create({ username: id, password: hash });
    }

    describe("signup", function () {
        const req = async (data: Record<string, any>) => {
            return request
                .post('/signup')
                .set('Accept', 'application/json')
                .send(data);
        }
        it("should create user with valid params", async function () {
            const res = await req({
                id: "anotheruser3",
                password: "mypass"
            });

            expect(res.status).toEqual(200);
            expect(res.body.token).toEqual(expect.any(String));
            expect(res.body.token.length).toBeGreaterThan(0);
            expect(res.body.refreshToken).toEqual(expect.any(String));
            expect(res.body.refreshToken.length).toBeGreaterThan(0);
        });
        it("should return error with missing password", async function () {
            const res = await req({
                id: "anotheruser3"
            });

            expect(res.status).toEqual(400);
        });
        it("should return error with missing id", async function () {
            const res = await req({
                password: "asdfasdf"
            });

            expect(res.status).toEqual(400);
        });
    });

    describe("signin", function () {
        const req = async (data: Record<string, any>) => {
            return request
                .post('/signin')
                .set('Accept', 'application/json')
                .send(data);
        }

        it("should create user with valid params", async function () {
            await createUser("anotheruser3", "mypass");

            const res = await req({
                id: "anotheruser3",
                password: "mypass"
            });

            expect(res.status).toEqual(200);
            expect(res.body.token).toEqual(expect.any(String));
            expect(res.body.token.length).toBeGreaterThan(0);
            expect(res.body.refreshToken).toEqual(expect.any(String));
            expect(res.body.refreshToken.length).toBeGreaterThan(0);
        });

        it("should return error with missing password", async function () {
            const res = await req({
                id: "anotheruser3"
            });

            expect(res.status).toEqual(400);
        });

        it("should return error if user not found", async function () {
            const res = await req({
                id: "anotheruser3",
                password: "mypass"
            });

            expect(res.status).toEqual(404);
        });

        it("should return error if credentials are invalid", async function () {
            await createUser("anotheruser3", "mypass");

            const res = await req({
                id: "anotheruser3",
                password: "mypa"
            });

            expect(res.status).toEqual(401);
            expect(res.body).toMatchObject({
                error: "Invalid password"
            });
        });

        it("should return error with missing id", async function () {
            const res = await req({
                password: "asdfasdf"
            });

            expect(res.status).toEqual(400);
        });
    });
});
