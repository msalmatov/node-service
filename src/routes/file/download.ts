import { Request } from "express-jwt";
import { NextFunction, Response } from "express";
import path from "path";
import { access, constants } from "fs/promises";
import * as fileService from "../../db/services/file-service";
import Errors from "../../utils/errors";
import config from "../../config";

export default async function download(req: Request, res: Response, next: NextFunction) {
    try {
        const fileId = req.params.id;
        if (!fileId) {
            throw Errors.invalidFileId();
        }

        const file = await fileService.getById(Number(fileId));
        if (!file) {
            throw Errors.fileNotFound();
        }

        const filePath = path.join(config.files.filesDir, file.id.toString());
        const filename = `${file.name}.${file.extension}`;

        // check if file exists in system
        await access(filePath, constants.R_OK);

        return res.status(200)
            .setHeader("Content-Type", file.mime)
            .download(filePath, filename);
    } catch (err) {
        return next(err);
    }
}