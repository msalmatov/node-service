import { Request } from "express-jwt";
import { NextFunction, Response } from "express";
import * as fileService from "../../db/services/file-service";
import Errors from "../../utils/errors";

export default async function info(req: Request, res: Response, next: NextFunction) {
    try {
        const fileId = req.params.id;
        if (!fileId) {
            throw Errors.invalidFileId();
        }

        const file = await fileService.getById(Number(fileId));
        if (!file) {
            throw Errors.fileNotFound();
        }

        return res.status(200).send(file);
    } catch (err) {
        return next(err);
    }
}