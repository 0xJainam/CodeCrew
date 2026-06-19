import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !username.trim()) {
            return res.status(400).json({ message: "Username is required" });
        }
        if (!email || !email.trim()) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        const existingUser = await User.findOne({
            email: email.trim().toLowerCase()
        });
        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email: email.trim().toLowerCase(),
            password: hashedPassword
        });
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } 
    catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !email.trim()) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );
        res.status(200).json({
            message: "Login successful",
            token
        });
    } 
    catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const profile = async (req, res) => {
    try {
        res.status(200).json({
            message: "Protected Route Accessed",
            user: req.user
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};