import jwt from 'jsonwebtoken';
import { db } from '../Config/db.js';
import { users } from '../../db/Schemas/User.js';
import { eq } from 'drizzle-orm';
import { JWT_PRIVATE_KEY } from '../Utils/Constants.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Access token required' 
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    
    // Get user from database
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.id));

    if (user.length === 0) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token - user not found' 
      });
    }

    // Add user info to request
    req.user = {
      id: user[0].id,
      email: user[0].email,
      role: user[0].role
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired' 
      });
    }

    return res.status(500).json({ 
      success: false,
      message: 'Authentication error' 
    });
  }
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: 'Insufficient permissions' 
      });
    }

    next();
  };
};
