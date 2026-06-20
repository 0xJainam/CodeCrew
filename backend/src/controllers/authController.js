import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const trimmedUsername = username?.trim();
        const trimmedEmail = email?.trim().toLowerCase();
        if(!trimmedUsername){
            return res.status(400).json({
                message: "Username is required"
            });
        }
        if(trimmedUsername.length < 3 || trimmedUsername.length > 20) {
            return res.status(400).json({
                message: "Username must be between 3 and 20 characters"
            });
        }
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if(!usernameRegex.test(trimmedUsername)) {
            return res.status(400).json({
                message: "Username can only contain letters, numbers and underscores"
            });
        }
        if(!trimmedEmail) {
            return res.status(400).json({
                message: "Email is required"
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(trimmedEmail)){
            return res.status(400).json({
                message: "Please enter a valid email address"
            });
        }
        if(!password || password.length < 6){
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }
        const existingEmail = await User.findOne({
            email: trimmedEmail
        });
        if(existingEmail){
            return res.status(400).json({
                message: "Email already registered"
            });
        }
        const existingUsername = await User.findOne({
            username: trimmedUsername
        });
        if(existingUsername){
            return res.status(400).json({
                message: "Username already taken"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: trimmedUsername,
            email: trimmedEmail,
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
        if(error.code === 11000){
            return res.status(400).json({
                message: "Email or username already exists"
            });
        }
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