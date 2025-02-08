import Project from "../models/Project";
import ProjectType from "../types/Project.interface";

export const findProjectByTitle = async (title: string): Promise<Project | null> => await Project.findOne({ where: { title } });

/**
 * Saves a project to the database.
 *
 * @param {Project} project - The project object to be saved.
 * @returns {Promise<Project>} A promise that resolves to the created project.
 */
export const saveProject = async (project: ProjectType): Promise<ProjectType> => await Project.create(project);

/**
 * Retrieves all projects from the database.
 *
 * @returns {Promise<Project[]>} A promise that resolves to an array of Project objects.
 */
export const findAllProjects = async (): Promise<Project[]> => await Project.findAll();

export const findProjectById = async (id: string): Promise<Project | null> => await Project.findByPk(id);