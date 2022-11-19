import { Request } from "express-jwt";
import { NextFunction, Response } from "express";
import fs from "fs/promises";
import path from "path";
import * as fileService from "../../db/services/file-service";
import Errors from "../../utils/errors";
import config from "../../config";

export default async function deleteFile(req: Request, res: Response, next: NextFunction) {
    try {
        const fileId = req.params.id ? Number(req.params.id) : 0;
        if (!fileId) {
            throw Errors.invalidFileId();
        }

        const file = await fileService.getById(fileId);
        if (!file) {
            throw Errors.fileNotFound();
        }

        const filePath = path.join(config.files.filesDir, file.id.toString());
        await fs.rm(filePath);
        await fileService.deleteById(file.id);

        return res.status(200).send("OK");
    } catch (err) {
        return next(err);
    }
}