import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useBusinessIdeaStore = create((set, get) => ({
  ideas: [],
  currentIdea: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  getAllIdeas: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/ideas");
      set({ ideas: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      console.error("Error fetching business ideas:", error);
      toast.error("Failed to fetch business ideas");
      set({ isLoading: false });
      return [];
    }
  },

  getIdeaById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/ideas/${id}`);
      set({ currentIdea: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      console.error("Error fetching business idea:", error);
      toast.error("Failed to fetch business idea");
      set({ isLoading: false });
      return null;
    }
  },

  createIdea: async (ideaData) => {
    set({ isCreating: true });
    try {
      const response = await axiosInstance.post("/ideas", ideaData);
      const newIdea = response.data;
      set((state) => ({
        ideas: [newIdea, ...state.ideas],
        isCreating: false,
      }));
      toast.success("Business idea created successfully!");
      return { success: true, data: newIdea };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create business idea";
      toast.error(message);
      set({ isCreating: false });
      return { success: false, message };
    }
  },

  updateIdea: async (id, ideaData) => {
    set({ isUpdating: true });
    try {
      const response = await axiosInstance.put(`/ideas/${id}`, ideaData);
      const updatedIdea = response.data;
      set((state) => ({
        ideas: state.ideas.map((idea) =>
          idea._id === id ? updatedIdea : idea
        ),
        currentIdea:
          state.currentIdea?._id === id ? updatedIdea : state.currentIdea,
        isUpdating: false,
      }));
      toast.success("Business idea updated successfully!");
      return { success: true, data: updatedIdea };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update business idea";
      toast.error(message);
      set({ isUpdating: false });
      return { success: false, message };
    }
  },

  deleteIdea: async (id) => {
    set({ isDeleting: true });
    try {
      await axiosInstance.delete(`/ideas/${id}`);
      set((state) => ({
        ideas: state.ideas.filter((idea) => idea._id !== id),
        currentIdea: state.currentIdea?._id === id ? null : state.currentIdea,
        isDeleting: false,
      }));
      toast.success("Business idea deleted successfully!");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete business idea";
      toast.error(message);
      set({ isDeleting: false });
      return { success: false, message };
    }
  },

  clearCurrentIdea: () => set({ currentIdea: null }),

  reset: () =>
    set({
      ideas: [],
      currentIdea: null,
      isLoading: false,
      isCreating: false,
      isUpdating: false,
      isDeleting: false,
    }),
}));
