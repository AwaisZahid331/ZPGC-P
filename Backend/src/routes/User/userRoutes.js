import express from "express";
import { registerUser, loginUser, verifyEmail, getUserProfile } from "../../Controllers/User/userController.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { registerSchema, loginSchema } from "../../Validation/User/userValidation.js";
import upload from "../../middleware/upload.js";
import { authenticateToken } from "../../middleware/auth.js";

const router = express.Router();

// Register route with file upload
router.post("/register", upload.single('avatar'), validateRequest(registerSchema), registerUser);

// Email verification route
router.get("/verify-email", verifyEmail);

// Login route
router.post("/login", validateRequest(loginSchema), loginUser);

// Get user profile (protected route)
router.get("/profile", authenticateToken, getUserProfile);

export default router;
