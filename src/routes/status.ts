import express from "express";
import { getStatuses } from "../controllers/status";

const router = express.Router();

router.get("", getStatuses);

export default router;
