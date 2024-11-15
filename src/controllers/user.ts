import createError from "http-errors";
import { findUserByEmail } from "../persistence/user";
import Auth from "../types/Auth.interface";
import { NextFunction, Request, Response } from "express";

/**
 * Authenticates a user based on provided email and password credentials.
 *
 * This function checks if the provided credentials are valid by searching for a user
 * with the given email and comparing the provided password with the stored password.
 * If authentication is successful, it sends a 200 status code. If authentication fails,
 * it throws a 403 Forbidden error.
 *
 * @param req - The Express request object containing the authentication credentials in the body.
 * @param res - The Express response object used to send the response.
 * @param next - The Express next function for passing control to the next middleware.
 *
 * @throws {Error} Throws a 403 Forbidden error if credentials are invalid or user is not found.
 *
 * @returns {Promise<void>} A promise that resolves when authentication is complete.
 */
export const authenticateUser = async (
  req: Request<{}, {}, Auth>,
  res: Response,
  next: NextFunction
) => {
  const credentials: Auth = req.body;
  try {
    if (!credentials.email || !credentials.password)
      throw createError(403, "Invalid credentials");
    const user = await findUserByEmail(credentials.email);
    if (!user || user.password !== credentials.password)
      throw createError(403, "Invalid credentials");
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
