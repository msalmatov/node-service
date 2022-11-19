import express from "express";
import fileUpload from "express-fileupload";
import uploadRouter from "./file/upload";
import listRouter from "./file/list";
import infoRouter from "./file/info";
import downloadRouter from "./file/download";
import updateRouter from "./file/update";
import deleteRouter from "./file/delete";

const router = express.Router();

const opt = {
    createParentPath: true,
    limits: { files: 1 },
    useTempFiles: true,
    tempFileDir: "files_tmp/"
}

router.post("/upload", fileUpload(opt), uploadRouter);
router.get("/list", listRouter);
router.get("/:id", infoRouter);
router.get("/download/:id", downloadRouter);
router.put("/update/:id", fileUpload(opt), updateRouter);
router.delete("/delete/:id", deleteRouter);

export default router;