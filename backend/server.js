import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import setupSocket from "./src/socket/socketHandler.js";

dotenv.config();

const PORT = process.env.PORT;
connectDB();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

setupSocket(io);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});