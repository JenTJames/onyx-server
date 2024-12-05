import { Router } from "express";

import { authenticateUser, createUser, getUserById } from "../controllers/user";

const router = Router();

router.get("/:id", getUserById);

router.post("", createUser);
router.post("/auth", authenticateUser);
export default router;
