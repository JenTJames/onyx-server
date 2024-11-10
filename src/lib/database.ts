import { Sequelize } from "sequelize";

const database = process.env.DATABASE_NAME!;
const username = process.env.DATABASE_USER!;
const password = process.env.DATABASE_PASSWORD!;

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
