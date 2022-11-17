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
    }
}

const config: Config = libConfig;
export default config;