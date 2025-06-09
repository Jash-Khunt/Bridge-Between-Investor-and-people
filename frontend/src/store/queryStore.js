import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useQueryStore = create((set, get) => ({
  queries: [],
  currentQuery: null,
  isLoading: false,
  isCreating: false,
  isAnswering: false,

  getAllQueries: async (filters = {}) => {
    set({ isLoading: true });
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await axiosInstance.get(`/queries?${queryString}`);
      set({ queries: response.data.data || [], isLoading: false });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching queries:", error);
      toast.error("Failed to fetch queries");
      set({ isLoading: false });
      return [];
    }
  },

  getQueryById: async (queryId) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/queries/${queryId}`);
      set({ currentQuery: response.data.data, isLoading: false });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching query by ID:", error);
      toast.error("Failed to fetch query");
      set({ isLoading: false });
      return null;
    }
  },

  createQuery: async (queryData) => {
    set({ isCreating: true });
    try {
      const response = await axiosInstance.post("/queries", queryData);
      const newQuery = response.data.data;
      set((state) => ({
        queries: [newQuery, ...state.queries],
        isCreating: false,
      }));
      toast.success("Query submitted successfully!");
      return { success: true, data: newQuery };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to submit query";
      toast.error(message);
      set({ isCreating: false });
      return { success: false, message };
    }
  },

  answerQuery: async (queryId, answer) => {
    set({ isAnswering: true });
    try {
      const response = await axiosInstance.post(
        `/queries/${queryId}/solution`,
        { answer }
      );
      const updatedQuery = response.data.data;
      set((state) => ({
        queries: state.queries.map((q) =>
          q._id === queryId ? { ...q, ...updatedQuery } : q
        ),
        currentQuery:
          state.currentQuery?._id === queryId
            ? { ...state.currentQuery, ...updatedQuery }
            : state.currentQuery,
        isAnswering: false,
      }));
      toast.success("Query answered successfully!");
      return { success: true, data: updatedQuery };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to answer query";
      toast.error(message);
      set({ isAnswering: false });
      return { success: false, message };
    }
  },

  getQueriesByStatus: (status) => {
    const { queries } = get();
    return queries.filter((query) => query.status === status);
  },

  reset: () =>
    set({
      queries: [],
      currentQuery: null,
      isLoading: false,
      isCreating: false,
      isAnswering: false,
    }),
}));
