import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js"
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    onlineUsers: [],
    socket:null,

    // isCheckingAuth: true,

    signup: async ( data ) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("Account created successfully");

            get().connectSocket();
        } catch (error) {
            const messege = error?.response?.data?.messege || error.messege || "Something went wrong";
    toast.error(messege);
        } finally {
            set({isSigningUp:false});
        }
    },

    login: async (data) => {
        set({isLoggingIn:true});
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("Logged in successfully");

            get().connectSocket();
        } catch (error) {
            const messege = error?.response?.data?.messege || error.messege || "Something went wrong";
            toast.error(messege);
        } finally {
            set({isLoggingIn:false});
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });
        });
    },

}));

