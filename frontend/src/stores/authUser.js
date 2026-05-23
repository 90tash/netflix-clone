import { create } from 'zustand';
import toast from "react-hot-toast";

const STORAGE_KEY = "netflix-demo-user";
const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

const getStoredUser = () => {
    try {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        return storedUser ? JSON.parse(storedUser) : null;
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
};

export const useAuthStore = create((set) => ({
    user: getStoredUser(),
    isSigningUp: false,
    isLoggingOut: false,
    isCheckingAuth: false,
    isLoggingIn: false,

    startDemo: (email = "guest@example.com") => {
        const safeEmail = email || "guest@example.com";
        const user = {
            email: safeEmail,
            username: safeEmail.split("@")[0],
            image: "/avatar1.png",
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        set({ user });
    },

    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
            const user = {
                email: credentials.email,
                username: credentials.username || credentials.email.split("@")[0],
                image,
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            set({ user, isSigningUp: false });
            toast.success("Demo account created");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during signup");
            set({ isSigningUp: false, user: null });
        }
    },

    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const storedUser = getStoredUser();
            const user = storedUser || {
                email: credentials.email,
                username: credentials.email.split("@")[0],
                image: "/avatar1.png",
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            set({ user, isLoggingIn: false });
            toast.success("Login successful");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        set({ isLoggingOut: true });
        try {
            localStorage.removeItem(STORAGE_KEY);
            set({ user: null, isLoggingOut: false });
            toast.success("Logged out successfully");
        } catch (error) {
            set({ isLoggingOut: false });
            toast.error(error.response?.data?.message || "Logging out failed");
        }
    },

    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            set({ user: getStoredUser(), isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null });
        }
    },
}));
