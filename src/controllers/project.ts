import { NextFunction, Request, Response } from "express";
import Project from "../types/Project.interface";
import createHttpError from "http-errors";
import { findProjectByTitle, saveProject } from "../persistence/project";

/**
 * Creates a new project.
 *
 * This function handles the creation of a new project. It expects the project details
 * to be provided in the request body. If the project title is missing, it will throw
 * a 400 Bad Request error. If a project with the same title already exists, it will
 * throw a 409 Conflict error. Upon successful creation, it responds with the ID of
 * the newly created project.
 *
 * @param req - The request object containing the project details in the body.
 * @param res - The response object used to send the response.
 * @param next - The next middleware function in the stack.
 *
 * @throws {HttpError} 400 - If the project title is missing.
 * @throws {HttpError} 409 - If a project with the same title already exists.
 */
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
    const project: Project = req.body;
    try {
        if (!project.title) throw createHttpError(400, "Title is required");
        const existingProject = await findProjectByTitle(project.title);
        if (existingProject) throw createHttpError(409, "Project already exists");
        const savedProject = await saveProject(project);
        res.status(201).send("" + savedProject.id);
    } catch (error) {
        next(error);
    }
}