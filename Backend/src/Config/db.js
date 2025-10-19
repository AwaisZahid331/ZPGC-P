// db.js
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import "dotenv/config";
import { DATABASE_URL } from "../Utils/Constants.js";

const { Pool } = pkg;

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: DATABASE_URL,
});

// Connect drizzle with the pool
export const db = drizzle(pool);

// Optional test function
export const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL connected successfully!");
    client.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};
