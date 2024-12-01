import { NextFunction, Request, Response } from "express";
import { findTeams } from "../persistence/team";

/**
 * Retrieves a list of teams from the database and sends them as a response.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns {Promise<void>} - A Promise that resolves when the response is sent or rejected when an error occurs.
 *
 * @throws Will throw an error if there is a problem with the database connection or query execution.
 */
export const getTeams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teams = await findTeams();
    res.status(200).send(teams);
  } catch (error) {
    next(error);
  }
};
