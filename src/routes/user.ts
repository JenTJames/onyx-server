import { Router } from "express";

import { authenticateUser } from "../controllers/user";

const router = Router();

router.post("/auth", authenticateUser);

export default router;
