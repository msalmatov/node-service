import express from "express";
import { validate } from 'express-validation';
import fileRouter from "./file";
import signupRouter from "./signup";
import signinRouter from "./signin";
import newTokenRouter from "./new-token";
import infoRouter from "./user-info";
import logoutRouter from "./logout";
import tokenChecker from "./token-checker";
import { authN } from "../utils/auth";
import { loginValidation, validateLogin } from "../utils/login-validator";

const router = express.Router();

router.post("/signup", validateLogin(), signupRouter);
router.post("/signin", validateLogin(), signinRouter);
router.post("/signin/new_token", newTokenRouter);

router.get("/info", authN(), tokenChecker, infoRouter);
router.get("/logout", authN(), logoutRouter);

router.use("/file", authN(), tokenChecker, fileRouter);

export default router;