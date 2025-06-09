import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useProposalStore = create((set, get) => ({
  proposals: [],
  currentProposal: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  getAllProposals: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/proposals");
      set({ proposals: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      console.error("Error fetching proposals:", error);
      toast.error("Failed to fetch proposals");
      set({ isLoading: false });
      return [];
    }
  },

  getProposalById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/proposals/${id}`);
      set({ currentProposal: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      console.error("Error fetching proposal:", error);
      toast.error("Failed to fetch proposal");
      set({ isLoading: false });
      return null;
    }
  },

  createProposal: async (proposalData) => {
    set({ isCreating: true });
    try {
      const response = await axiosInstance.post(
        "/proposals",
        proposalData
      );
      const newProposal = response.data;
      set((state) => ({
        proposals: [newProposal, ...state.proposals],
        isCreating: false,
      }));
      toast.success("Proposal created successfully!");
      return { success: true, data: newProposal };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create proposal";
      toast.error(message);
      set({ isCreating: false });
      return { success: false, message };
    }
  },

  updateProposal: async (id, proposalData) => {
    set({ isUpdating: true });
    try {
      const response = await axiosInstance.put(
        `/proposals/${id}`,
        proposalData
      );
      const updatedProposal = response.data;
      set((state) => ({
        proposals: state.proposals.map((p) =>
          p._id === id ? { ...p, ...updatedProposal } : p
        ),
        currentProposal:
          state.currentProposal?._id === id
            ? { ...state.currentProposal, ...updatedProposal }
            : state.currentProposal,
        isUpdating: false,
      }));
      toast.success("Proposal updated successfully!");
      return { success: true, data: updatedProposal };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update proposal";
      toast.error(message);
      set({ isUpdating: false });
      return { success: false, message };
    }
  },

  deleteProposal: async (id) => {
    set({ isDeleting: true });
    try {
      await axiosInstance.delete(`/proposals/${id}`);
      set((state) => ({
        proposals: state.proposals.filter((p) => p._id !== id),
        currentProposal:
          state.currentProposal?._id === id ? null : state.currentProposal,
        isDeleting: false,
      }));
      toast.success("Proposal deleted successfully!");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete proposal";
      toast.error(message);
      set({ isDeleting: false });
      return { success: false, message };
    }
  },

  clearCurrentProposal: () => set({ currentProposal: null }),

  reset: () =>
    set({
      proposals: [],
      currentProposal: null,
      isLoading: false,
      isCreating: false,
      isUpdating: false,
      isDeleting: false,
    }),
}));
