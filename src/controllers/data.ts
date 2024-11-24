import Role from "../models/Role";
import User from "../models/User";
import users from "../data/users";
import roles from "../data/roles";
import database from "../lib/database";
import { NextFunction, Request, Response } from "express";

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
    await User.bulkCreate(users);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
