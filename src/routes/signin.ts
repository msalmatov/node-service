import { NextFunction, Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import * as userService from "../db/services/user-service";
import * as Password from "../utils/password";
import tokenContainer from "../utils/token-container";

export default async function signin(req: Request, res: Response, next: NextFunction) {
    // TODO: add better validation (joi)
    const { id: username, password } = req.body;
    if (!username || !password) {
        return next("Invalid user credentials");
    }

    const user = await userService.getByUsername(username);
    if (!user) {
        return next("User not exists");
    }

    if (!await Password.compare(password, user.password)) {
        return next("Incorrect password");
    }

    const token = generateAccessToken({ id: user.id, username: user.username });
    const refreshToken = generateRefreshToken({ id: user.id, username: user.username });

    tokenContainer.setRefreshTokenInfo(refreshToken, {
        id: user.id,
        username: user.username,
        accessToken: token
    });

    return res.status(200).send({
        token,
        refreshToken
    });
}