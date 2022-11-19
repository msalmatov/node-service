import { NextFunction, Request, Response } from "express";
import { generateAccessToken, verifyRefreshToken } from "../utils/auth";
import * as userService from "../db/services/user-service";
import tokenContainer from "../utils/token-container";
import Errors from "../utils/errors";

export default async function newToken(req: Request, res: Response, next: NextFunction) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw Errors.refreshTokenNotSpecifiedErr();
        }

        const userInfo = verifyRefreshToken(refreshToken);

        const user = await userService.getById(userInfo.id);
        if (!user) {
            throw Errors.userNotFoundErr();
        }

        const token = generateAccessToken({ id: user.id, username: user.username });

        tokenContainer.setRefreshTokenInfo(refreshToken, {
            id: user.id,
            username: user.username,
            accessToken: token
        })

        return res.status(200).send({
            token,
            refreshToken
        });
    } catch (err) {
        return next(err);
    }
}