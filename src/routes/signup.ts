import { NextFunction, Request, Response } from "express";

export default async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        return res.status(200).send("OK");
    } catch (err) {
        next(err);
    }
}