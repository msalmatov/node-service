import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../config";

export type UserInfo = {
    id: number,
    username: string
}

export function generateAccessToken(user: UserInfo) {
    return jwt.sign(user, config.auth.secret, { expiresIn: config.auth.expiresIn });
}

export function generateRefreshToken(user: UserInfo) {
    return jwt.sign(user, config.auth.refreshSecret, { expiresIn: config.auth.refreshExpiresIn });
}

export function verifyAccessToken(accessToken: string) {
    jwt.verify(accessToken, config.auth.secret);
}

export function verifyRefreshToken(refreshToken: string) {
    jwt.verify(refreshToken, config.auth.refreshSecret);
}

export function authN() {
    return expressjwt({
        secret: config.auth.secret,
        algorithms: ["HS256"]
    })
}
