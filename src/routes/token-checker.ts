import { Request } from "express-jwt";
import { NextFunction, Response } from "express";
import tokenContainer from "../utils/token-container";

export default async function tokenChecker(req: Request, res: Response, next: NextFunction) {
    if (!req.header("Authorization")) {
        return next("Not authorized");
    }

    const accessToken = req.header("Authorization").split(" ")[1];
    const info = tokenContainer.getRefreshTokenInfoByAccessToken(accessToken);
    if (!info) {
        return next("Not authorized user");
    }

    return next();
}