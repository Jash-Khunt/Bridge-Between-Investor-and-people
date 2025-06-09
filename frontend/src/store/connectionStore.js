import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useConnectionStore = create((set, get) => ({
  connections: [],
  isLoading: false,
  isRequesting: false,
  isResponding: false,

  getConnections: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/connections");
      set({ connections: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      console.error("Error fetching connections:", error);
      toast.error("Failed to fetch connections");
      set({ isLoading: false });
      return [];
    }
  },

  requestConnection: async (businessIdeaId, message) => {
    set({ isRequesting: true });
    try {
      const response = await axiosInstance.post("/connections/request", {
        businessIdeaId,
        message,
      });
      const newConnection = response.data;

      set((state) => ({
        connections: [newConnection, ...state.connections],
        isRequesting: false,
      }));

      toast.success("Connection request sent successfully!");
      return { success: true, data: newConnection };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to send connection request";
      toast.error(message);
      set({ isRequesting: false });
      return { success: false, message };
    }
  },

  acceptConnection: async (connectionId) => {
    set({ isResponding: true });
    try {
      const response = await axiosInstance.post(
        `/connections/accept/${connectionId}`
      );
      const updatedConnection = response.data;

      set((state) => ({
        connections: state.connections.map((conn) =>
          conn._id === connectionId ? { ...conn, ...updatedConnection } : conn
        ),
        isResponding: false,
      }));

      toast.success("Connection request accepted!");
      return { success: true, data: updatedConnection };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to accept connection";
      toast.error(message);
      set({ isResponding: false });
      return { success: false, message };
    }
  },

  rejectConnection: async (connectionId) => {
    set({ isResponding: true });
    try {
      const response = await axiosInstance.post(
        `/connections/reject/${connectionId}`
      );
      const updatedConnection = response.data;

      set((state) => ({
        connections: state.connections.map((conn) =>
          conn._id === connectionId ? { ...conn, ...updatedConnection } : conn
        ),
        isResponding: false,
      }));

      toast.success("Connection request rejected!");
      return { success: true, data: updatedConnection };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to reject connection";
      toast.error(message);
      set({ isResponding: false });
      return { success: false, message };
    }
  },

  getConnectionsByStatus: (status) => {
    const { connections } = get();
    return connections.filter((conn) => conn.status === status);
  },

  reset: () =>
    set({
      connections: [],
      isLoading: false,
      isRequesting: false,
      isResponding: false,
    }),
}));
