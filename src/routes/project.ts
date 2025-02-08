import express from "express";
import { createProject, getProjectById, getProjectsByOwner } from "../controllers/project";

const router = express.Router();

router.get("", getProjectsByOwner);
router.get("/:projectId", getProjectById);

router.post("", createProject);

export default router;