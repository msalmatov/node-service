import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import path from "path";
import { UploadedFile } from "express-fileupload";
import * as fileService from "../../db/services/file-service";
import { FileInput } from "../../db/models/file";
import Errors from "../../utils/errors";

export default async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const fileId = req.params.id ? Number(req.params.id) : 0;
        if (!fileId) {
            throw Errors.invalidFileId();
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            throw Errors.fileNotUploadedErr();
        }
        const fileInfo = req.files["fileUpload"] as UploadedFile;

        const { id: userId } = req.auth;

        const extDot = path.extname(fileInfo.name);
        const ext = extDot.startsWith(".") ? extDot.substring(1) : "";
        const basename = path.basename(fileInfo.name, extDot);

        const file: FileInput = {
            id: fileId,
            user_id: userId,
            name: basename,
            extension: ext,
            mime: fileInfo.mimetype,
            size: fileInfo.size,
            date_upload: new Date()
        };

        await fileService.updateById(fileId, file);

        const filePath = path.join("files", file.id.toString());
        fileInfo.mv(filePath, function (err) {
            if (err) {
                throw new Error(err);
            }

            return res.status(200).send("OK");
        });
    } catch (err) {
        return next(err);
    }
}