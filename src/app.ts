import chalk from "chalk";
import userRoutes from "./routes/user";
import sequelize from "./lib/database";
import express, { Express } from "express";
import errorHandler from "./middlewares/error";

const PORT: number = process.env.PORT ? +process.env.PORT : 8080;
const app: Express = express();
const baseUrl: string = "/onyx/api/v1";

const main = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(chalk.bgCyanBright("Database connected successfully."));

    app.use(express.json());
    app.use(`${baseUrl}/users`, userRoutes);
    app.use(errorHandler);
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
