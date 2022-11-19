import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import path from "path";
import { UploadedFile } from "express-fileupload";
import * as fileService from "../../db/services/file-service";
import Errors from "../../utils/errors";

export default async function upload(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw Errors.fileNotUploadedErr();
        }
        const fileInfo = req.files["fileUpload"] as UploadedFile;

        const { id: userId } = req.auth;

        const extDot = path.extname(fileInfo.name);
        const ext = extDot.startsWith(".") ? extDot.substring(1) : "";
        const basename = path.basename(fileInfo.name, extDot);

        const file = await fileService.create({
            user_id: userId,
            name: basename,
            extension: ext,
            mime: fileInfo.mimetype,
            size: fileInfo.size,
            date_upload: new Date()
        });

        const filePath = path.join("files", file.id.toString());
        fileInfo.mv(filePath, function (err) {
            if (err) {
                return next(err);
            }

            return res.status(200).send("OK");
        });
    } catch (err) {
        return next(err);
    }
}

