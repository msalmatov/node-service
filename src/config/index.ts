import { config as libConfig } from "./config";

type Config = {
    service: {
        port: number
    },
    database: {
        host: string,
        user: string,
        password: string,
        name: string,
        dialect: string
    },
    auth: {
        secret: string,
        expiresIn: string,
        refreshSecret: string,
        refreshExpiresIn: string
    },
    files: {
        filesDir: string,
        tempFilesDir: string
    }
}

const config: Config = libConfig;
export default config;