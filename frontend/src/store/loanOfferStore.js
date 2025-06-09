import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useLoanOfferStore = create((set, get) => ({
  loanOffers: [],
  currentLoanOffer: null,
  totalOffers: 0,
  page: 1,
  pages: 1,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  getAllLoanOffers: async (query = {}) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/loans", {
        params: query,
      });
      const { data, total, page, pages } = response.data;
      set({
        loanOffers: data,
        totalOffers: total,
        page,
        pages,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching loan offers:", error);
      toast.error("Failed to fetch loan offers");
      set({ isLoading: false });
      return [];
    }
  },

  getLoanOfferById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/loans/${id}`);
      set({ currentLoanOffer: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      console.error("Error fetching loan offer:", error);
      toast.error("Failed to fetch loan offer");
      set({ isLoading: false });
      return null;
    }
  },

  createLoanOffer: async (loanOfferData) => {
    set({ isCreating: true });
    try {
      const response = await axiosInstance.post("/loans", loanOfferData);
      const newOffer = response.data;
      set((state) => ({
        loanOffers: [newOffer, ...state.loanOffers],
        isCreating: false,
      }));
      toast.success("Loan offer created successfully!");
      return { success: true, data: newOffer };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create loan offer";
      toast.error(message);
      set({ isCreating: false });
      return { success: false, message };
    }
  },

  updateLoanOffer: async (id, loanOfferData) => {
    set({ isUpdating: true });
    try {
      const response = await axiosInstance.put(`/loans/${id}`, loanOfferData);
      const updatedOffer = response.data;
      set((state) => ({
        loanOffers: state.loanOffers.map((offer) =>
          offer._id === id ? { ...offer, ...updatedOffer } : offer
        ),
        currentLoanOffer:
          state.currentLoanOffer?._id === id
            ? { ...state.currentLoanOffer, ...updatedOffer }
            : state.currentLoanOffer,
        isUpdating: false,
      }));
      toast.success("Loan offer updated successfully!");
      return { success: true, data: updatedOffer };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update loan offer";
      toast.error(message);
      set({ isUpdating: false });
      return { success: false, message };
    }
  },

  deleteLoanOffer: async (id) => {
    set({ isDeleting: true });
    try {
      await axiosInstance.delete(`/loans/${id}`);
      set((state) => ({
        loanOffers: state.loanOffers.filter((offer) => offer._id !== id),
        currentLoanOffer:
          state.currentLoanOffer?._id === id ? null : state.currentLoanOffer,
        isDeleting: false,
      }));
      toast.success("Loan offer deleted successfully!");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete loan offer";
      toast.error(message);
      set({ isDeleting: false });
      return { success: false, message };
    }
  },

  clearCurrentLoanOffer: () => set({ currentLoanOffer: null }),

  reset: () =>
    set({
      loanOffers: [],
      currentLoanOffer: null,
      totalOffers: 0,
      page: 1,
      pages: 1,
      isLoading: false,
      isCreating: false,
      isUpdating: false,
      isDeleting: false,
    }),
}));
