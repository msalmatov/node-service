import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { verifyAccessToken } from "../utils/auth";

export default async function userInfo(req: Request, res: Response, next: NextFunction) {
    try {
        console.log("Auth:", req.auth);

        // TODO: get user by req.auth.id from DB

        const token = req.header("Authorization").split(" ")[1];
        verifyAccessToken(token);
        return res.status(200).send({ id: req.auth.username });
    } catch (err) {
        next(err);
    }
}