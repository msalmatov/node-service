import express from "express";

const router = express.Router();

router.post("/upload");
router.get("/list");
router.delete("/delete/:id");
router.get("/:id");
router.get("/download/:id");
router.put("/update/:id");

export default router;