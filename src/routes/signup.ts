import { NextFunction, Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import * as userService from "../db/services/user-service";
import * as Password from "../utils/password";

export default async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        // TODO: add better validation
        const {id: username, password} = req.body;
        if (!username || !password) {
            throw new Error("Invalid user credentials");
        }

        let user = await userService.getByUsername(username);
        if (user) {
            throw new Error("User already exists");
        }

        const hash = await Password.getHash(password);
        user = await userService.create({username, password: hash});

        const token = generateAccessToken({ id: user.id, username: user.username });
        const refreshToken = generateRefreshToken({ id: user.id, username: user.username });

        return res.status(200).send({
            token,
            refreshToken
        });
    } catch (err) {
        next(err);
    }
}