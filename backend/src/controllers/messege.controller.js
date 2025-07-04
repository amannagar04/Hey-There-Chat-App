import User from "../models/user.model.js";
import Messege from "../models/messege.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const check2 = (req,res) => {
    res.send("check controller")
}

// function to load sidebar
export const getUsersForSidebar = async (req,res) => {
    try{
        // const loggedInUserId = req.user._id;
        const usersForSidebar = await User.find().select("-password");

        res.status(200).json(usersForSidebar);
    } catch(error){
        console.log(error);
        res.status(500).json({error: "sidebar error"});
    }
}

// function to load chats
export const getMesseges = async (req,res) => {
    try{
        const { user1,user2 } = req.params;

        const messeges = await Messege.find({
            $or:[
                {senderId:user1,receiverId:user2},
                {senderId:user2,receiverId:user1},
            ]
        });

        res.status(200).json(messeges);
    } catch(error){
        res.status(500).json({error: "Chat error"});
    }
}

// function to send messege
export const sendMessege = async (req,res) =>{
    try {
        const { text,senderId } = req.body;
        const { id: receiverId } = req.params;
        // const senderId = req.user._id; // it is using middleware jwt causing error

        const newMessege = new Messege({
            receiverId,
            senderId,
            text,
        });

        await newMessege.save();

        // socket.io implementation
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessege", newMessege);
        }

        res.status(201).json(newMessege);

    } catch (error) {
        console.error("sendMessege error:", error); // shows actual error messege & stack trace
        res.status(500).json({ error: error.messege || "Error while sending messege" });
    }

}