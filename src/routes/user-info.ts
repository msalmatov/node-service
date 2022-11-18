import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import * as userService from "../db/services/user-service";


export default async function userInfo(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.getById(req.auth.id);
        if (!user) {
            throw new Error("Invalid user id");
        }

        return res.status(200).send({ id: user.username });
    } catch (err) {
        next(err);
    }
}