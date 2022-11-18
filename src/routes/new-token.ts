import { NextFunction, Request, Response } from "express";
import { generateAccessToken, verifyRefreshToken } from "../utils/auth";
import * as userService from "../db/services/user-service";
import tokenContainer from "../utils/token-container";

export default async function newToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return next("Refresh token not specified");
    }

    const userInfo = verifyRefreshToken(refreshToken);

    const user = await userService.getById(userInfo.id);
    if (!user) {
        return next("User not found");
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
}