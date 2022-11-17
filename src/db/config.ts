import config from "../config";
import { Dialect, Sequelize } from "sequelize";

const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        dialect: config.database.dialect as Dialect
    }
);

export { sequelize };