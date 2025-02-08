import createHttpError from "http-errors";
import Project from "../types/Project.interface";
import { NextFunction, Request, Response } from "express";
import { findAllProjects, findProjectById, findProjectByTitle, saveProject } from "../persistence/project";
import { findUserById } from "../persistence/user";


/**
 * Creates a new project.
 *
 * This function handles the creation of a new project. It expects the project details
 * to be provided in the request body. The project must have a title and an owner.
 * If the project title already exists, a conflict error is thrown. If the owner is not found,
 * an unprocessable entity error is thrown. Upon successful creation, the project ID is returned.
 *
 * @param req - The request object containing the project details in the body.
 * @param res - The response object used to send the project ID upon successful creation.
 * @param next - The next middleware function in the stack, used to handle errors.
 *
 * @throws {createHttpError} 400 - If the project title or owner is missing.
 * @throws {createHttpError} 409 - If a project with the same title already exists.
 * @throws {createHttpError} 422 - If the owner is not found.
 */
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
    const project: Project = req.body;
    try {
        if (!project.title) throw createHttpError(400, "Title is required");
        if (!project.ownedBy) throw createHttpError(400, "Project cannot be created without an owner");
        const existingProject = await findProjectByTitle(project.title);
        if (existingProject) throw createHttpError(409, "Project already exists");
        const owner = await findUserById(project.ownedBy);
        if (!owner) throw createHttpError(422, "Owner not found");
        const savedProject = await saveProject(project);
        res.status(201).send("" + savedProject.id);
    } catch (error) {
        next(error);
    }
}

/**
 * Retrieves projects based on the owner ID provided in the request parameters.
 * If an owner ID is provided, it fetches projects associated with that owner.
 * If no owner ID is provided, it fetches all projects.
 *
 * @param req - The request object containing the owner ID in the parameters.
 * @param res - The response object used to send the retrieved projects.
 * @param next - The next middleware function in the stack.
 * 
 * @throws {HttpError} If the owner ID is provided but no user is found with that ID.
 */
export const getProjectsByOwner = async (req: Request, res: Response, next: NextFunction) => {
    const ownerId = req.params.ownerId;
    try {
        let projects = [];

        if (ownerId) {
            const owner = await findUserById(+ownerId);
            if (!owner) throw createHttpError(400, "Could not find a user with the ID: " + ownerId);
            projects = await owner.getProjects();
        }
        else projects = await findAllProjects();
        res.status(200).send(projects);
    } catch (error) {
        next(error);
    }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    const projectId: string = req.params.projectId;
    try {
        const project = await findProjectById(projectId);
        if (!project) throw createHttpError(400, "Could not find a project with the given ID: " + projectId)
        res.status(200).send(project);
    } catch (error) {
        next(error);
    }
};