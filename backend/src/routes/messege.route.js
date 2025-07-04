import express from "express";
import { check2, getMesseges, getUsersForSidebar, sendMessege } from "../controllers/messege.controller.js";

const messegeRoutes = express.Router();

messegeRoutes.get("/check",(req,res) => {
    res.send("<h1>Messege Routes check</h1>")
})
messegeRoutes.get("/check2",check2);

messegeRoutes.get("/users",getUsersForSidebar);
messegeRoutes.get("/:user1/:user2",getMesseges); //dynamic 
messegeRoutes.post("/send/:id",sendMessege);

export default messegeRoutes;