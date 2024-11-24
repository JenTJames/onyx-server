import express from "express";
import { getRoles } from "../controllers/role";

const router = express.Router();

router.get("", getRoles);

export default router;
