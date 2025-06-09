"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useConnectionStore } from "../../../store/connectionStore";
import toast from "react-hot-toast";

const MyConnections = () => {
  const user = useAuthStore((state) => state.user);
  const {
    connections,
    isLoading,
    isResponding,
    getConnections,
    acceptConnection,
    rejectConnection,
    getConnectionsByStatus,
  } = useConnectionStore();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    getConnections();
  }, [getConnections]);

  const handleAcceptConnection = async (connectionId) => {
    try {
      const result = await acceptConnection(connectionId);
      if (result.success) {
        toast.success("Connection request accepted");
      }
    } catch (error) {
      console.error("Error accepting connection:", error);
    }
  };

  const handleRejectConnection = async (connectionId) => {
    try {
      const result = await rejectConnection(connectionId);
      if (result.success) {
        toast.success("Connection request rejected");
      }
    } catch (error) {
      console.error("Error rejecting connection:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const filteredConnections =
    user.role === "entrepreneur"
      ? connections.filter((conn) => conn.status !== "rejected")
      : connections;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Connections</h1>
        <p className="text-gray-600 mt-2">
          {user.role === "entrepreneur"
            ? "Manage investor connection requests"
            : "Track your connection requests to entrepreneurs"}
        </p>
      </div>

      {filteredConnections.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🤝</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No connections yet
          </h3>
          <p className="text-gray-600">
            {user.role === "entrepreneur"
              ? "Connection requests from investors will appear here"
              : "Your connection requests to entrepreneurs will appear here"}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredConnections.map((connection) => (
            <div
              key={connection._id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {user.role === "entrepreneur"
                        ? connection.investorId?.name || "Unknown Investor"
                        : connection.businessIdeaId?.entrepreneurId?.name ||
                          "Unknown Entrepreneur"}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statusColors[connection.status]
                      }`}
                    >
                      {connection.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {user.role === "entrepreneur"
                        ? connection.investorId?.email
                        : connection.businessIdeaId?.entrepreneurId?.email}
                    </p>
                    {user.role === "entrepreneur" &&
                      connection.investorId?.phone && (
                        <p>
                          <span className="font-medium">Phone:</span>{" "}
                          {connection.investorId.phone}
                        </p>
                      )}
                    {user.role === "entrepreneur" &&
                      connection.investorId?.location && (
                        <p>
                          <span className="font-medium">Location:</span>{" "}
                          {[
                            connection.investorId.location.city,
                            connection.investorId.location.state,
                            connection.investorId.location.country,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      )}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  {user.role === "entrepreneur"
                    ? "Business Idea:"
                    : "Your Message:"}
                </h4>
                <p className="text-gray-700">
                  {user.role === "entrepreneur"
                    ? connection.businessIdeaId?.title
                    : connection.message || "No message provided"}
                </p>
              </div>

              {user.role === "entrepreneur" && connection.message && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Investor's Message:
                  </h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {connection.message}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-gray-500">
                  {connection.status === "pending"
                    ? "Requested"
                    : connection.status === "accepted"
                    ? "Accepted"
                    : "Rejected"}{" "}
                  on {new Date(connection.createdAt).toLocaleDateString()}
                </span>

                {user.role === "entrepreneur" &&
                  connection.status === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAcceptConnection(connection._id)}
                        disabled={isResponding}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-medium disabled:bg-green-400 disabled:cursor-not-allowed"
                      >
                        {isResponding ? "Processing..." : "Accept"}
                      </button>
                      <button
                        onClick={() => handleRejectConnection(connection._id)}
                        disabled={isResponding}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm font-medium disabled:bg-red-400 disabled:cursor-not-allowed"
                      >
                        {isResponding ? "Processing..." : "Reject"}
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyConnections;
