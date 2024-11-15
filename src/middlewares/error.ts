import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

// Enhanced error handling middleware
/**
 * Enhanced error handling middleware for Express applications.
 * This function logs errors with context and sends appropriate responses.
 *
 * @param {HttpError} error - The error object caught by Express.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 * @returns {void}
 */
const errorHandler = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) return next(error); // Headers are already sent. So, delegate to the default error handler

  const statusCode = error.status || 500;
  const isProduction = process.env.NODE_ENV === "production";

  // Enhanced logging with request context
  console.error(`[${new Date().toISOString()}]`, {
    method: req.method,
    path: req.path,
    statusCode,
    message: error.message,
    stack: isProduction ? null : error.stack, // Log stack trace only in development
  });

  // Send a response with a user-friendly message
  res.status(statusCode).json({
    message:
      statusCode === 500 ? "An unexpected error occurred" : error.message,
    ...(isProduction ? {} : { stack: error.stack }), // Include stack only in development
  });
};

export default errorHandler;
