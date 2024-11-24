import express from "express";
import { refreshData } from "../controllers/data";

const router = express.Router();

router.post("/refresh-data", refreshData);

export default router;
