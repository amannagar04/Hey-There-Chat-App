import express from "express";
import authRoutes from "./routes/auth.route.js"
import messegeRoutes from "./routes/messege.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import {app,server} from "./lib/socket.js";

import path from "path";

dotenv.config();

const __dirname = path.resolve();

app.use(cors({
  origin: "http://localhost:5173", // connecting frontend
  credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messege", messegeRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  console.log("http://localhost:" + PORT);
  connectDB();
});
