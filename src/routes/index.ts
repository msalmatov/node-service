import express from "express";
import fileRouter from "./file";
import signupRouter from "./signup";

const router = express.Router();

router.post("/signup", signupRouter);
router.post("/signin");
router.post("/signin/new_token");

router.get("/info");
router.get("/logout");

router.use("/file", fileRouter);

export default router;