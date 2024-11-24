import Role from "../models/Role";
import User from "../models/User";
import users from "../data/users";
import roles from "../data/roles";
import bcrypt from "bcrypt";
import database from "../lib/database";
import { NextFunction, Request, Response } from "express";

/**
 * Creates new users in the database by hashing their passwords and storing them.
 *
 * @remarks
 * This function is responsible for preparing user data by hashing passwords and then
 * storing them in the database using the `User.bulkCreate` method.
 *
 * @returns {Promise<void>} - A promise that resolves when the users have been created successfully.
 *
 * @example
 * ```typescript
 * await createUsers();
 * ```
 */
const createUsers = async () => {
  const newUsers = users.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password!, 12);
    user.password = hashedPassword;
    return user;
  });
  await User.bulkCreate(await Promise.all(newUsers));
};

/**
 * Refreshes the database by dropping and recreating tables, then populating them with new data.
 *
 * @remarks
 * This function is responsible for resetting the database by dropping and recreating tables,
 * then populating them with new data. It uses the `database.sync` method to synchronize the
 * database schema with the models, and the `Role.bulkCreate` and `createUsers` functions to
 * populate the tables with initial data.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns {Promise<void>} - A promise that resolves when the database has been refreshed successfully.
 *
 * @example
 * ```typescript
 * await refreshData(req, res, next);
 * ```
 */
export const refreshData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await database.sync({
      force: true,
      alter: true,
    });
    await Role.bulkCreate(roles);
    await createUsers();

    console.log("Database refreshed successfully.");
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
