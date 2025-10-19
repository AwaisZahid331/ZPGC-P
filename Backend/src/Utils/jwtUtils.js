import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY, JWT_ACCESS_EXPIRATION_TIME, JWT_REFRESH_EXPIRATION_TIME,} from "../utils/constants.js"; 

export const createJWTToken = async (userId) => {

  try {
    const accessToken = jwt.sign({ id: userId, tokenType: "access" }, JWT_PRIVATE_KEY,
      { expiresIn: JWT_ACCESS_EXPIRATION_TIME }
    );
 
    const refreshToken = jwt.sign( { id: userId, tokenType: "refresh" }, JWT_PRIVATE_KEY,
      { expiresIn: JWT_REFRESH_EXPIRATION_TIME }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Token generation failed");
  }
};


export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    return { valid: true, decoded };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return { valid: false, expired: true, message: "Token expired" };
    }
    return { valid: false, expired: false, message: "Invalid token" };
  }
};

export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY); 
    return { valid: true, decoded };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return { valid: false, expired: true, message: "Token expired" };
    }
    return { valid: false, expired: false, message: "Invalid token" };
  }
};