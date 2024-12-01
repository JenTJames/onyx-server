import { NextFunction, Response, Request } from "express";
import { findStatuses } from "../persistence/status";

/**
 * Retrieves a list of statuses from the database and sends them as a JSON response.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
 *
 * @throws Will throw an error if there is an issue with the database operation.
 *
 * @example
 * // Example usage:
 * // GET /statuses
 * // Response:
 * // [
 * //   { "id": 1, "title": "CREATED" },
 * //   { "id": 2, "title": "IN_PROGRESS" }
 * // ]
 */
export const getStatuses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const statuses = await findStatuses();
    res.status(200).json(statuses);
  } catch (error) {
    next(error);
  }
};
