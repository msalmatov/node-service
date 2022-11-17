import { NextFunction, Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";

export default async function signin(req: Request, res: Response, next: NextFunction) {
    try {
        // TODO: add better validation
        if (!req.body.id || !req.body.password) {
            throw Error("Invalid user credentials");
        }

        // TODO: check if user exists and password match

        // TODO: put ids from User after saving to DB
        const token = generateAccessToken({ id: 111, username: req.body.id });
        const refreshToken = generateRefreshToken({ id: 111, username: req.body.id });

        return res.status(200).send({
            token,
            refreshToken
        });
    } catch (err) {
        next(err);
    }
}