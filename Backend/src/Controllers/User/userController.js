import bcrypt from "bcryptjs";
import crypto from "crypto";
import { db } from "../../Config/db.js";
import { users } from "../../../db/Schemas/User.js";
import { eq } from "drizzle-orm";
import { createJWTToken } from "../../Utils/jwtUtils.js";
import { sendVerificationEmail } from "../../Utils/emailService.js";
import { SERVER_HOST, SERVER_PORT } from "../../Utils/Constants.js";

// Helper function to generate proper URL for avatar
const getAvatarUrl = (avatarPath) => {
  if (!avatarPath) return null;
  
  console.log('🔍 Original avatar path:', avatarPath);
  
  // Extract just the filename from the full path
  const filename = avatarPath.split('/').pop();
  console.log('📁 Extracted filename:', filename);
  
  const url = `http://${SERVER_HOST}:${SERVER_PORT}/uploads/avatars/${filename}`;
  console.log('🌐 Generated URL:', url);
  
  return url;
};

export const registerUser = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      phone, 
      cnic, 
      program, 
      department, 
      semester, 
      batch, 
      address, 
      role 
    } = req.body;

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Handle avatar file upload
    let avatarPath = null;
    if (req.file) {
      // Store only the relative path, not the full path
      avatarPath = `uploads/avatars/${req.file.filename}`;
      console.log('💾 Storing avatar path:', avatarPath);
    }

    // Insert user with all fields
    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        phone,
        password: hashedPassword,
        cnic,
        program,
        department,
        semester,
        batch,
        address,
        avatar: avatarPath,
        verificationToken,
        tokenExpires,
        role: role || "student",
        year: semester, // Map semester to year field
      })
      .returning();

    // Send verification email
    const emailResult = await sendVerificationEmail(email, name, verificationToken);
    
    if (emailResult.success) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully. Please check your email to verify your account.",
        user: {
          id: newUser[0].id,
          name: newUser[0].name,
          email: newUser[0].email,
          isEmailVerified: newUser[0].isEmailVerified
        },
        emailSent: true
      });
    } else {
      // User created but email failed
      return res.status(201).json({
        success: true,
        message: "User registered successfully, but verification email could not be sent. Please contact support.",
        user: {
          id: newUser[0].id,
          name: newUser[0].name,
          email: newUser[0].email,
          isEmailVerified: newUser[0].isEmailVerified
        },
        emailSent: false
      });
    }
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required"
      });
    }

    // Find user by verification token
    const user = await db
      .select()
      .from(users)
      .where(eq(users.verificationToken, token));

    if (user.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification token"
      });
    }

    const userData = user[0];

    // Check if token is expired
    if (new Date() > new Date(userData.tokenExpires)) {
      return res.status(400).json({
        success: false,
        message: "Verification token has expired"
      });
    }

    // Check if already verified
    if (userData.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified"
      });
    }

    // Update user to verified
    await db
      .update(users)
      .set({
        isEmailVerified: true,
        verificationToken: null,
        tokenExpires: null
      })
      .where(eq(users.id, userData.id));

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        isEmailVerified: true
      }
    });

  } catch (err) {
    console.error("Error in verifyEmail:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT middleware

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = user[0];

    const userResponse = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phone,
      cnic: userData.cnic,
      program: userData.program,
      department: userData.department,
      semester: userData.semester,
      batch: userData.batch,
      address: userData.address,
      profilePicture: getAvatarUrl(userData.avatar),
      role: userData.role,
      isEmailVerified: userData.isEmailVerified,
    };
    
    console.log('👤 Returning user profile:', userResponse);
    
    res.status(200).json({
      success: true,
      user: userResponse,
    });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = existingUser[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate Tokens
    const { accessToken, refreshToken } = await createJWTToken(user.id);

    // Return user and tokens
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phone,
      cnic: user.cnic,
      program: user.program,
      department: user.department,
      semester: user.semester,
      batch: user.batch,
      address: user.address,
      profilePicture: getAvatarUrl(user.avatar),
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    };
    
    console.log('🔐 Login successful for user:', userResponse);
    
    res.status(200).json({
      message: "Login successful",
      user: userResponse,
      tokens: {
        accessToken: `Bearer ${accessToken}`,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
