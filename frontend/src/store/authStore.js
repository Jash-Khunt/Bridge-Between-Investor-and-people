import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  isAuthenticated: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({
        user: response.data,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
      return response.data;
    } catch (error) {
      console.error("Not authenticated", error);
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
      return null;
    }
  },

  login: async (credentials) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      set({
        user: response.data,
        isAuthenticated: true,
        loading: false,
      });
      toast.success("Login successful!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      set({ loading: false });
      throw error;
    }
  },

  signup: async (userData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      set({
        user: response.data,
        isAuthenticated: true,
        loading: false,
      });
      toast.success("Account created successfully!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      toast.error(message);
      set({ loading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error", error);
      toast.error("Logout failed");
      set({ loading: false });
    }
  },

  updateProfile: async (profileData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put("/auth/profile", profileData);
      set({
        user: response.data,
        loading: false,
      });
      toast.success("Profile updated successfully!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Update failed";
      toast.error(message);
      set({ loading: false });
      throw error;
    }
  },
}));
