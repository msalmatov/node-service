import { Request } from "express-jwt";
import { NextFunction, Response } from "express";
import * as fileService from "../../db/services/file-service";
import fs from "fs/promises";
import path from "path";

export default async function deleteFile(req: Request, res: Response, next: NextFunction) {
    try {
        const fileId = req.params.id ? Number(req.params.id) : 0;
        if (!fileId) {
            throw new Error("File id isn't specified");
        }

        const file = await fileService.getById(fileId);
        if (!file) {
            throw new Error("File with specified id not found");
        }

        const filePath = path.join("files", file.id.toString());
        await fs.rm(filePath);
        await fileService.deleteById(file.id);

        return res.status(200).send("OK");
    } catch (err) {
        return next(err);
    }
}