import { create } from 'zustand';
import toast from "react-hot-toast";
import axios from 'axios';

// Set your deployed backend URL here
const API_BASE_URL = "https://netflix-clone-t4o6.onrender.com";

export const useAuthStore = create((set) => ({
    user: null, // Default state
    isSigningUp: false,
    isLoggingOut: false,
    isCheckingAuth: true,
    isLoggingIn: false,

    // Signup function
    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/auth/signup`, credentials, { withCredentials: true });
            set({ user: response.data.user, isSigningUp: false });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during signup");
            set({ isSigningUp: false, user: null });
        }
    },

    // Login function
    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, credentials, { withCredentials: true });
            set({ user: response.data.user, isLoggingIn: false });
            toast.success("Login successful");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            set({ isLoggingIn: false });
        }
    },

    // Logout function
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post(
                `${API_BASE_URL}/api/v1/auth/logout`,
                {}, // No body needed for logout
                { withCredentials: true }
            );
            set({ user: null, isLoggingOut: false });
            toast.success("Logged out successfully");
        } catch (error) {
            set({ isLoggingOut: false });
            toast.error(error.response?.data?.message || "Logging out failed");
        }
    },

    // Auth check function
    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/auth/authCheck`, { withCredentials: true });
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null });
            // toast.error(error.response?.data.message || "An error occurred");
        }
    },
}));
