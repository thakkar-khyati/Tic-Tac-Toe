import { protectRoute } from "../middleware/auth.middleware.js";
import express from "express"
import { createGameRoom, getActiveGameRooms, getLeaderBoard } from "../controllers/gameRooms.controller.js";

const router = express.Router();

router.post("/", protectRoute, createGameRoom)

router.get("/", protectRoute, getActiveGameRooms)

router.get("/leaderboard", protectRoute, getLeaderBoard)

export default router