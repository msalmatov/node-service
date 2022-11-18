import { Request } from "express-jwt";
import { NextFunction, Response } from "express";
import * as fileService from "../../db/services/file-service";

export default async function info(req: Request, res: Response, next: NextFunction) {
    try {
        const fileId = req.params.id;
        if (!fileId) {
            throw new Error("File id isn't specified");
        }

        const file = await fileService.getById(Number(fileId));
        if (!file) {
            throw new Error("File with specified id not found");
        }

        return res.status(200).send(file);
    } catch (err) {
        return next(err);
    }
}