import { NextFunction, Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import * as userService from "../db/services/user-service";
import * as Password from "../utils/password";
import tokenContainer from "../utils/token-container";
import Errors from "../utils/errors";

export default async function signin(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: username, password } = req.body;

        const user = await userService.getByUsername(username);
        if (!user) {
            throw Errors.userNotFoundErr();
        }

        if (!await Password.compare(password, user.password)) {
            throw Errors.invalidPasswordErr();
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
    } catch (err) {
        return next(err);
    }
}