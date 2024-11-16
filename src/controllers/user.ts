import bcrypt from "bcrypt";
import createError from "http-errors";
import Auth from "../types/Auth.interface";
import User from "../types/User.interface";
import UserModel from "../types/User.model.interface";
import { NextFunction, Request, Response } from "express";
import { findUserByEmail, saveUser } from "../persistence/user";

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
    if (!user) throw createError(403, "Invalid credentials");
    const isValid = bcrypt.compare(credentials.password, user.password!);
    if (!isValid) throw createError(403, "Invalid credentials");
    const safeUser = hideSensitiveDetails(user);
    res.status(200).send({ ...user.dataValues, password: undefined });
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new user with the provided details.
 *
 * This function validates the user details, hashes the password, and saves the user to the database.
 * If successful, it sends a 201 Created status. If there's an error, it passes it to the next middleware.
 *
 * @param req - The Express request object containing the user details in the body.
 * @param res - The Express response object used to send the response.
 * @param next - The Express next function for passing control to the next middleware.
 *
 * @throws {Error} Throws a 400 Bad Request error if user details are invalid.
 *
 * @returns {Promise<void>} A promise that resolves when user creation is complete.
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User = req.body;
  try {
    if (
      !user ||
      !user.firstname ||
      !user.lastname ||
      !user.password ||
      !user.email ||
      !user.phone
    )
      throw createError(400, "Invalid user details");
    // Check if the email is already taken by another user
    const existingUser = await findUserByEmail(user.email);
    if (existingUser)
      throw createError(403, "Email already taken by another user");
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    await saveUser(user);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

/**
 * Removes sensitive information from a user object.
 *
 * This function takes a user object and returns a new object with all properties
 * except the password. It handles both plain objects and Sequelize model instances.
 *
 * @param user - The user object from which to remove sensitive details.
 *               This can be either a plain JavaScript object or a Sequelize model instance.
 *
 * @returns A new object containing all user properties except the password.
 *          If the input is a Sequelize model instance, it returns the data values
 *          without the password. Otherwise, it returns a shallow copy of the input
 *          object with the password set to undefined.
 */
export const hideSensitiveDetails = (user: UserModel) => {
  if (user.dataValues)
    return {
      ...user.dataValues,
      password: undefined,
    };
  return { ...user, password: undefined };
};
