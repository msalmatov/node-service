import { NextFunction, Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import * as userService from "../db/services/user-service";
import * as Password from "../utils/password";

export default async function signup(req: Request, res: Response, next: NextFunction) {
    // TODO: add better validation (joi)
    const { id: username, password } = req.body;
    if (!username || !password) {
        return next("Invalid user credentials");
    }

    let user = await userService.getByUsername(username);
    if (user) {
        return next("User already exists");
    }

    const hash = await Password.getHash(password);
    user = await userService.create({ username, password: hash });

    const token = generateAccessToken({ id: user.id, username: user.username });
    const refreshToken = generateRefreshToken({ id: user.id, username: user.username });

    return res.status(200).send({
        token,
        refreshToken
    });
}