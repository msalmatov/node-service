import { NextFunction, Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import * as userService from "../db/services/user-service";

export default async function signin(req: Request, res: Response, next: NextFunction) {
    try {
        // TODO: add better validation
        const {id: username, password} = req.body;
        if (!username || !password) {
            throw new Error("Invalid user credentials");
        }

        const user = await userService.getByUsername(username);
        if (!user) {
            throw new Error("User not exists");
        }

        // TODO: check password hashes
        if (password !== user.password) {
            throw new Error("Incorrect password");
        }

        const token = generateAccessToken({ id: user.id, username: user.username });
        const refreshToken = generateRefreshToken({ id: user.id, username: user.username });

        return res.status(200).send({
            token,
            refreshToken
        });
    } catch (err) {
        next(err);
    }
}