import { Request } from "express-jwt";
import { NextFunction, Response } from "express";
import * as fileService from "../../db/services/file-service";
import Errors from "../../utils/errors";

export default async function list(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: userId } = req.auth;
        const listSize = req.query.list_size ? Number(req.query.list_size) : 10;
        const page = req.query.page ? Number(req.query.page) : 1;
        if (!listSize || !page) {
            throw Errors.invalidListParams();
        }

        const files = await fileService.getAllByUser(userId, page, listSize);
        return res.status(200).send(files);
    } catch (err) {
        return next(err);
    }
}