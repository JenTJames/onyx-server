import { Router } from "express";

import { authenticateUser, createUser } from "../controllers/user";

const router = Router();

router.post("", createUser);
router.post("/auth", authenticateUser);
export default router;
