import { Dialect, Sequelize } from "sequelize";
import * as mysql from "mysql2/promise";
import config from "../config";

const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        dialect: config.database.dialect as Dialect,
        logging: false
    }
);

async function createDb() {
    const {host, user, password, name} = config.database;
    const connection = await mysql.createConnection({ host, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${name}\`;`);
}

export { sequelize, createDb };