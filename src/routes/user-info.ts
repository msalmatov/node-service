import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import * as userService from "../db/services/user-service";
import Errors from "../utils/errors";


export default async function userInfo(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.getById(req.auth.id);
        if (!user) {
            throw Errors.invalidUserIdErr();
        }

        return res.status(200).send({ id: user.username });
    } catch (err) {
        return next(err);
    }
}