import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import tokenContainer from "../utils/token-container";

export default async function logout(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization").split(" ")[1];

    tokenContainer.deleteRefreshTokenByAccessToken(token);
    return res.status(200).send("OK");
}