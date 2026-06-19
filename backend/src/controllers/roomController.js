import Room from "../models/Room.js";
import crypto from "crypto";

export const createRoom = async (req, res) => {
    try {
        const roomId = crypto.randomBytes(8).toString("hex");
        const room = await Room.create({
            roomId,
            owner: req.user.userId,
            members: [req.user.userId]
        });
        res.status(201).json({
            message: "Room created successfully",
            room
        });
    } 
    catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const joinRoom = async (req, res) => {
    try {
        if(!req.body || !req.body.roomId){
            return res.status(400).json({
                message: "Room ID is required"
            });
        }
        const { roomId } = req.body;
        const room = await Room.findOne({ roomId });
        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }
        const alreadyMember = room.members.some(
            member => member.toString() === req.user.userId
        );
        if (!alreadyMember) {
            room.members.push(req.user.userId);
            await room.save();
        }
        res.status(200).json({
            message: "Joined room successfully",
            room
        });
    } 
    catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const getRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await Room.findOne({ roomId });
        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }
        if (
            !room.members
                .map(id => id.toString())
                .includes(req.user.userId)
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }
        res.status(200).json(room);
    } 
    catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const updateCode = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { files } = req.body;
        if (!files || typeof files !== "object" || Array.isArray(files)) {
            return res.status(400).json({ message: "Invalid files format" });
        }
        const entries = Object.entries(files);
        if (entries.length > 50) {
            return res.status(400).json({ message: "Maximum 50 files allowed" });
        }
        for (const [name, data] of entries) {
            if (typeof name !== "string" || name.length > 100) {
                return res.status(400).json({ message: "Filename must be 100 characters or less" });
            }
            if (!data || typeof data !== "object") {
                return res.status(400).json({ message: "Invalid file data" });
            }
            if (typeof data.content !== "string" || data.content.length > 100000) {
                return res.status(400).json({ message: "File content must be 100000 characters or less" });
            }
            if (typeof data.language !== "string" || data.language.length > 30) {
                return res.status(400).json({ message: "Language must be 30 characters or less" });
            }
        }
        const room = await Room.findOne({ roomId });
        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }
        if (
            !room.members
                .map(id => id.toString())
                .includes(req.user.userId)
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }
        room.files = files;
        room.markModified("files");
        await room.save();
        res.status(200).json({
            message: "Code updated successfully"
        });
    } 
    catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};