import cors from "cors";
import chalk from "chalk";
import userRoutes from "./routes/user";
import roleRoutes from "./routes/role";
import dataRoutes from "./routes/data";
import sequelize from "./lib/database";
import teamRoutes from "./routes/team";
import statusRoutes from "./routes/status";
import express, { Express } from "express";
import projectRoutes from "./routes/project";
import errorHandler from "./middlewares/error";
import { defineAssociations } from "./models/associations";

const PORT: number = process.env.PORT ? +process.env.PORT : 8080;
const app: Express = express();
const baseUrl: string = "/onyx/api/v1";

const main = async () => {
  try {
    // Authenticate the database
    await sequelize.authenticate();
    console.log(chalk.bgBlueBright("Database connected successfully."));

    // Define associations
    defineAssociations();

    // Synchronize database
    await sequelize.sync({
      // force: true, // Recreate tables during development
      alter: true, // Update schema to match models
    });
    console.log(chalk.bgBlueBright("Database synchronized successfully."));

    app.use(cors());
    app.use(express.json());
    app.use(`${baseUrl}/data`, dataRoutes);
    app.use(`${baseUrl}/teams`, teamRoutes);
    app.use(`${baseUrl}/users`, userRoutes);
    app.use(`${baseUrl}/roles`, roleRoutes);
    app.use(`${baseUrl}/statuses`, statusRoutes);
    app.use(`${baseUrl}/projects`, projectRoutes);
    app.use(errorHandler);
  } catch (error) {
    console.error(
      chalk.bgRedBright("Error connecting to the database:", error)
    );
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(
      chalk.bgGreenBright(
        `Server listening on http://localhost:${PORT}${baseUrl}`
      )
    );
  });
};

main();
