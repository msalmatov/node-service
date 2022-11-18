import express from "express";
import fileUpload from "express-fileupload";
import uploadRouter from "./file/upload";
import listRouter from "./file/list";

const router = express.Router();

const opt = {
    createParentPath: true,
    limits: { files: 1 },
    useTempFiles: true,
    tempFileDir: "files_tmp/"
}

router.post("/upload", fileUpload(opt), uploadRouter);
router.get("/list", listRouter);
router.get("/:id");
router.get("/download/:id");
router.put("/update/:id", fileUpload(opt));
router.delete("/delete/:id");

export default router;