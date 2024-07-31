import { Sequelize } from "sequelize";
import {connection} from "@/database/config";
import pg from "pg";

export const sequelize = new Sequelize(connection, {
    quoteIdentifiers: false,
    dialect: "postgres",
    dialectModule: pg
});