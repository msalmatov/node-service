import { NextFunction, Request, Response } from "express";
import { generateAccessToken, verifyRefreshToken } from "../utils/auth";

export default async function newToken(req: Request, res: Response, next: NextFunction) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw Error("Refresh token not specified");
        }

        const userInfo = verifyRefreshToken(refreshToken);

        // TODO: get user from DB

        // TODO: put ids from User after saving to DB
        const token = generateAccessToken({ id: userInfo.id, username: userInfo.username });

        return res.status(200).send({
            token,
            refreshToken
        });
    } catch (err) {
        next(err);
    }
}