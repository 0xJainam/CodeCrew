import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Room from "../models/Room.js";

const roomPresence = new Map();

function broadcastRoomUsers(io, roomId) {
    const presenceMap = roomPresence.get(roomId);
    if (!presenceMap) return;
    const entries = [...presenceMap.values()];
    const unique = [...new Map(entries.map(u => [u.userId, u])).values()];
    io.to(roomId).emit("room-users", unique);
}

export default function setupSocket(io) {
    io.use(async (socket, next) => {
        const token = socket.handshake.auth?.token;
        if (!token) return next(new Error("Authentication required"));
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId).select("username");
            if (!user) return next(new Error("User not found"));
            socket.userId = decoded.userId;
            socket.username = user.username;
            next();
        } catch {
            next(new Error("Invalid token"));
        }
    });

    io.on("connection", (socket) => {
        socket.on("join-room", async (roomId, callback) => {
            socket.join(roomId);
            socket.roomId = roomId;

            const room = await Room.findOne({ roomId });
            const isOwner = room ? room.owner.toString() === socket.userId : false;

            if (!roomPresence.has(roomId)) {
                roomPresence.set(roomId, new Map());
            }
            roomPresence.get(roomId).set(socket.id, {
                userId: socket.userId,
                username: socket.username,
                isOwner,
            });

            broadcastRoomUsers(io, roomId);

            if (typeof callback === "function") {
                callback({ userId: socket.userId });
            }
        });

        socket.on("code-change", ({ roomId, files }) => {
            if (!socket.roomId || socket.roomId !== roomId) return;
            socket.to(roomId).emit("receive-code-change", files);
        });

        socket.on("disconnect", () => {
            const { roomId } = socket;
            if (roomId && roomPresence.has(roomId)) {
                roomPresence.get(roomId).delete(socket.id);
                if (roomPresence.get(roomId).size === 0) {
                    roomPresence.delete(roomId);
                } else {
                    broadcastRoomUsers(io, roomId);
                }
            }
        });
    });
}
