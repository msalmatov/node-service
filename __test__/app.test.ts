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
                id: "user@gmail.com",
                password: "Mypass2_"
            });

            expect(res.status).toEqual(200);
            expect(res.body.token).toEqual(expect.any(String));
            expect(res.body.token.length).toBeGreaterThan(0);
            expect(res.body.refreshToken).toEqual(expect.any(String));
            expect(res.body.refreshToken.length).toBeGreaterThan(0);
            const user = await userService.getByUsername("user@gmail.com")
            expect(user).toBeDefined();
            expect(user.id).toEqual(1);
        });
        it("should return error with missing password", async function () {
            const res = await req({
                id: "user@gmail.com"
            });

            expect(res.status).toEqual(400);
        });
        it("should return error with invalid password", async function () {
            const res = await req({
                id: "user@gmail.com",
                password: "asdfasdf"
            });

            expect(res.status).toEqual(400);
        });
        it("should return error with missing id", async function () {
            const res = await req({
                password: "Mypass2_"
            });

            expect(res.status).toEqual(400);
        });
        it("should return error for invalid email", async function () {
            const res = await req({
                id: "username",
                password: "Mypass2_"
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
            await createUser("user@gmail.com", "Mypass2_");

            const res = await req({
                id: "user@gmail.com",
                password: "Mypass2_"
            });

            expect(res.status).toEqual(200);
            expect(res.body.token).toEqual(expect.any(String));
            expect(res.body.token.length).toBeGreaterThan(0);
            expect(res.body.refreshToken).toEqual(expect.any(String));
            expect(res.body.refreshToken.length).toBeGreaterThan(0);
        });

        it("should return error with missing password", async function () {
            const res = await req({
                id: "user@gmail.com"
            });

            expect(res.status).toEqual(400);
        });

        it("should return error if user not found", async function () {
            const res = await req({
                id: "user@gmail.com",
                password: "Mypass2_"
            });

            expect(res.status).toEqual(404);
        });

        it("should return error if credentials are invalid", async function () {
            await createUser("user@gmail.com", "Mypass2_");

            const res = await req({
                id: "user@gmail.com",
                password: "Mypass3_"
            });

            expect(res.status).toEqual(401);
            expect(res.body).toMatchObject({
                errors: ["Invalid password"]
            });
        });

        it("should return error with missing id", async function () {
            const res = await req({
                password: "Mypass2_"
            });

            expect(res.status).toEqual(400);
        });
    });

    describe("File upload", function () {
        it.todo("File upload tests will be here");
    });
    describe("File list", function () {
        it.todo("File list tests will be here");
    });
    describe("File info", function () {
        it.todo("File info tests will be here");
    });
    describe("File download", function () {
        it.todo("File download tests will be here");
    });
    describe("File update", function () {
        it.todo("File update tests will be here");
    });
    describe("File delete", function () {
        it.todo("File delete tests will be here");
    });
});
