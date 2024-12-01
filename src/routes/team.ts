import { Router } from "express";
import { getTeams } from "../controllers/team";

const router = Router();

router.get("", getTeams);

export default router;
