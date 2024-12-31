import express from "express";
import { createProject, getProjectsByOwner } from "../controllers/project";

const router = express.Router();

router.get("", getProjectsByOwner);

router.post("", createProject);

export default router;