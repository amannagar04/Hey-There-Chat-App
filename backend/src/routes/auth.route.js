import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";


const authRoutes = express.Router();

authRoutes.get("/check",(req,res)=>{
    res.send("<h1>Checking...</h1>")
})

authRoutes.post("/signup", signup);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);

export default authRoutes;