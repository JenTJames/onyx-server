import { findRoles } from "../persistence/role";
import { NextFunction, Request, Response } from "express";

export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roles = await findRoles();
    res.status(200).send(roles);
  } catch (error) {
    next(error);
  }
};
