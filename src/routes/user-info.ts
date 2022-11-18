import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import * as userService from "../db/services/user-service";


export default async function userInfo(req: Request, res: Response, next: NextFunction) {
    const user = await userService.getById(req.auth.id);
    if (!user) {
        return next("Invalid user id");
    }

    return res.status(200).send({ id: user.username });
}