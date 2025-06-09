import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAdviceStore = create((set, get) => ({
  adviceList: [],
  currentAdvice: null,

  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  getAllAdvice: async (filters = {}) => {
    set({ isLoading: true });
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axiosInstance.get(`/advice?${params}`);
      set({ adviceList: response.data.data, isLoading: false });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching advice:", error);
      toast.error("Failed to fetch advice articles");
      set({ isLoading: false });
      return [];
    }
  },

  getAdviceById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/advice/${id}`);
      set({ currentAdvice: response.data.data, isLoading: false });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching advice by ID:", error);
      toast.error("Failed to fetch advice article");
      set({ isLoading: false });
      return null;
    }
  },

  createAdvice: async (adviceData) => {
    set({ isCreating: true });
    try {
      const response = await axiosInstance.post("/advice", adviceData);
      const newAdvice = response.data.data;

      set((state) => ({
        adviceList: [newAdvice, ...state.adviceList],
        isCreating: false,
      }));

      toast.success("Advice created successfully");
      return { success: true, data: newAdvice };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create advice";
      toast.error(message);
      set({ isCreating: false });
      return { success: false, message };
    }
  },

  updateAdvice: async (id, updateData) => {
    set({ isUpdating: true });
    try {
      const response = await axiosInstance.put(`/advice/${id}`, updateData);
      const updatedAdvice = response.data.data;

      set((state) => ({
        adviceList: state.adviceList.map((item) =>
          item._id === id ? { ...item, ...updatedAdvice } : item
        ),
        currentAdvice:
          state.currentAdvice?._id === id
            ? { ...state.currentAdvice, ...updatedAdvice }
            : state.currentAdvice,
        isUpdating: false,
      }));

      toast.success("Advice updated successfully");
      return { success: true, data: updatedAdvice };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update advice";
      toast.error(message);
      set({ isUpdating: false });
      return { success: false, message };
    }
  },

  deleteAdvice: async (id) => {
    set({ isDeleting: true });
    try {
      await axiosInstance.delete(`/advice/${id}`);
      set((state) => ({
        adviceList: state.adviceList.filter((item) => item._id !== id),
        currentAdvice:
          state.currentAdvice?._id === id ? null : state.currentAdvice,
        isDeleting: false,
      }));
      toast.success("Advice deleted successfully");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete advice";
      toast.error(message);
      set({ isDeleting: false });
      return { success: false, message };
    }
  },

  clearCurrentAdvice: () => set({ currentAdvice: null }),

  resetAdviceStore: () =>
    set({
      adviceList: [],
      currentAdvice: null,
      isLoading: false,
      isCreating: false,
      isUpdating: false,
      isDeleting: false,
    }),
}));
