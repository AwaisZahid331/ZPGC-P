// app.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import {  SERVER_PORT, SERVER_HOST, CORS_URL} from "./Utils/Constants.js";
import { testDbConnection } from "./Config/db.js";
import userRoutes from "./routes/User/userRoutes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static('uploads'));
app.use('/uploads/avatars', express.static('uploads/avatars'));

app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

// User routes
app.use("/api/users", userRoutes);

// Start the server
app.listen(SERVER_PORT, SERVER_HOST, async () => {
  console.log(`✅ Server running on http://${SERVER_HOST}:${SERVER_PORT}`);
  await testDbConnection();
});
