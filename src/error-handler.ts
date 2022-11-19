import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);

    if (err.status) {
        res.status(err.status);
    }

    if (err instanceof ValidationError) {
        res.status(err.statusCode);
        res.send({errors: err.details});
    } else {
        res.send({errors: [err.message]});
    }
}