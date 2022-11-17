import express from "express";
import fileRouter from "./file";
import signupRouter from "./signup";
import signinRouter from "./signin";
// import newTokenRouter from "./new-token";
import infoRouter from "./user-info";
import { authN } from "../utils/auth";

const router = express.Router();

router.post("/signup", signupRouter);
router.post("/signin", signinRouter);
// router.post("/signin/new_token", newTokerRouter);

router.get("/info", authN(), infoRouter);
router.get("/logout", authN());

router.use("/file", authN(), fileRouter);

export default router;