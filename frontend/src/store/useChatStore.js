import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set,get) => ({
    messege:[],
    users:[],
    selectedUser: null,
    isUserLoading: false,
    isMessegesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messege/users");
            set({users: res.data});
        } catch (error) {
            const messege = error?.response?.data?.messege || error.messege || "Something went wrong in getUsers";
            toast.error(messege);
        } finally {
            set({isUserLoading:false});
        }
    },

    getMesseges: async (userId,senderId) => {
        set({isMessegesLoading:true});
        try {
            const res = await axiosInstance.get(`/messege/${senderId}/${userId}`);
            set({messege:res.data});
        } catch (error) {
            const messege = error?.response?.data?.messege || error.messege || "Something went wrong in Messeges";
            toast.error(messege);
        } finally {
            set({isMessegesLoading:false});
        }      
    },

    sendMesseges: async (messegeData, senderId) => {
        const {selectedUser, messege} = get();
        // if (!selectedUser?._id) return toast.error("No user selected");
        try {
            const res = await axiosInstance.post(`/messege/send/${selectedUser._id}`, {text:messegeData,senderId});
            set({messege:[...messege,res.data]});
        } catch (error) {
            toast.error("function error"); 
        }
    },

    subscribeToMesseges: () => {
        const {selectedUser} = get();
        if(!selectedUser) return;
        

        const socket = useAuthStore.getState().socket;

        socket.on("newMessege", (newMessege) => {
            const isMessegeSentFromSelectedUser = newMessege.senderId === selectedUser._id;
            if (!isMessegeSentFromSelectedUser) return;

            set({
                messege: [...get().messege, newMessege],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessege");
    },

    // need to optimise
    setSelectedUser: (selectedUser) => set({ selectedUser}),
}));