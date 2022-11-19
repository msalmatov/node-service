import { NextFunction, Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import * as userService from "../db/services/user-service";
import * as Password from "../utils/password";
import tokenContainer from "../utils/token-container";
import Errors from "../utils/errors";

export default async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: username, password } = req.body;

        let user = await userService.getByUsername(username);
        if (user) {
            throw Errors.userAlreadyExistsErr();
        }

        const hash = await Password.getHash(password);
        user = await userService.create({ username, password: hash });

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
    } catch (err) {
        return next(err);
    }
}