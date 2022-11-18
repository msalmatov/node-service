import express from "express";
import uploadRouter from "./file/upload";
import fileUpload from "express-fileupload";

const router = express.Router();

const opt = {
    createParentPath: true,
    limits: { files: 1 },
    useTempFiles: true,
    tempFileDir: "files_tmp/"
}

router.post("/upload", fileUpload(opt), uploadRouter);
router.get("/list");
router.delete("/delete/:id");
router.get("/:id");
router.get("/download/:id");
router.put("/update/:id", fileUpload(opt));

export default router;