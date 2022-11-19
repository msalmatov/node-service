import { Request } from "express-jwt";
import { NextFunction, Response } from "express";
import { access, constants } from "fs/promises";
import * as fileService from "../../db/services/file-service";
import path from "path";

export default async function download(req: Request, res: Response, next: NextFunction) {
    try {
        const fileId = req.params.id;
        if (!fileId) {
            throw new Error("File id isn't specified");
        }

        const file = await fileService.getById(Number(fileId));
        if (!file) {
            throw new Error("File with specified id not found");
        }

        const filePath = path.join("files", file.id.toString());
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