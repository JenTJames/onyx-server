import bcrypt from "bcrypt";
import createError from "http-errors";
import Auth from "../types/Auth.interface";
import User from "../types/User.interface";
import { NextFunction, Request, Response } from "express";
import {
  findUserById,
  findUserByEmail,
  findUserByPhone,
  saveUser,
} from "../persistence/user";
import IdInParams from "../types/IdInParams.interface";

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
 * @throws {Error} Throws a 401 Unauthorized error if credentials are invalid or user is not found.
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
      throw createError(401, "Invalid credentials");
    const user = await findUserByEmail(credentials.email, false);
    if (!user) throw createError(401, "Invalid credentials");
    const isValid = await bcrypt.compare(credentials.password, user.password!);
    if (!isValid) throw createError(401, "Invalid credentials");
    res.status(200).send({ ...user.dataValues, password: undefined });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a user by their unique identifier.
 *
 * This function accepts a user's unique identifier (ID) as a parameter, fetches the user's details from the database,
 * and sends the user's information as a response. If the user is not found, it passes the error to the next middleware.
 *
 * @param {Request<IdInParams>} req - The Express request object containing the user's ID in the request parameters.
 * @param {Response} res - The Express response object used to send the response.
 * @param {NextFunction} next - The Express next function for passing control to the next middleware.
 *
 * @throws {Error} If the user is not found, it throws a 404 Not Found error.
 *
 * @returns {Promise<void>} A promise that resolves when the user's details are fetched and sent as a response.
 */
export const getUserById = async (
  req: Request<IdInParams>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await findUserById(id);
    res.status(200).send(user);
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
    const existingUserWithEmail = await findUserByEmail(user.email);
    const existingUserWithPhone = await findUserByPhone(user.phone);
    if (existingUserWithEmail) throw createError(409, "EMAIL_TAKEN");
    if (existingUserWithPhone) throw createError(409, "PHONE_TAKEN");
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    await saveUser(user);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
