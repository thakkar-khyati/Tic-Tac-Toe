import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http"

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import gameRoomRoutes from "./routes/gameRooms.routes.js"
import { gameSocket } from "./socket/gameSocket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.cors,
        credentials: true,
    })
);

// Initialize WebSocket
gameSocket(server)

app.use("/api/auth", authRoutes);
app.use("/api/game-rooms", gameRoomRoutes)

server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});