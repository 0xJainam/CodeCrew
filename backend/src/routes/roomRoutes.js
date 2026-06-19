import express from "express";
import { createRoom, joinRoom, getRoom, updateCode } from "../controllers/roomController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createRoom);
router.post("/join", protect, joinRoom);
router.get("/:roomId", protect, getRoom);
router.put("/:roomId/code", protect, updateCode);

export default router;