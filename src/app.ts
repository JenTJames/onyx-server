import chalk from "chalk";
import sequelize from "./lib/database";
import express, { Express } from "express";

const PORT: string = process.env.PORT || "8080";
const app: Express = express();

app.use(express.json());

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log(chalk.bgCyanBright("Database connected successfully."));
  } catch (error) {
    console.error(
      chalk.bgRedBright("Error connecting to the database:", error)
    );
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(chalk.bgGreenBright(`Server is running on port ${PORT}`));
  });
};

main();
