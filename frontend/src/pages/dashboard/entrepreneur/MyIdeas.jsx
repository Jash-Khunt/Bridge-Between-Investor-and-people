"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBusinessIdeaStore } from "../../../store/businessIdeaStore";
import toast from "react-hot-toast";

const MyIdeas = () => {
  const {
    ideas,
    currentIdea,
    isLoading,
    isDeleting,
    getAllIdeas,
    deleteIdea,
    clearCurrentIdea,
  } = useBusinessIdeaStore();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in discussion": "bg-blue-100 text-blue-800",
    funded: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  const handleDelete = async (ideaId) => {
    if (
      !window.confirm("Are you sure you want to delete this business idea?")
    ) {
      return;
    }

    const result = await deleteIdea(ideaId);
    if (result.success) {
      toast.success("Business idea deleted successfully");
    }
  };

  useEffect(() => {
    getAllIdeas();
    return () => clearCurrentIdea();
  }, [getAllIdeas, clearCurrentIdea]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const userIdeas = ideas;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Ideas</h1>
          <p className="text-gray-600 mt-2">Manage and track business ideas</p>
        </div>
        <Link
          to="/dashboard/create-idea"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
        >
          Create New Idea
        </Link>
      </div>

      {userIdeas.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">💡</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No business ideas yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start by creating your first business idea to attract investors
          </p>
          <Link
            to="/dashboard/create-idea"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Create Your First Idea
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userIdeas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                  {idea.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[idea.status]
                  }`}
                >
                  {idea.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Category:</span> {idea.category}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Funding Required:</span> ₹
                  {idea.fundingRequired?.toLocaleString()}
                </p>
                {idea.expectedROI && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Expected ROI:</span>{" "}
                    {idea.expectedROI}
                  </p>
                )}
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {idea.description}
              </p>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-xs text-gray-500">
                  Created {new Date(idea.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Link
                    to={`/dashboard/edit-idea/${idea._id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(idea._id)}
                    disabled={isDeleting}
                    className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                  >
                    {isDeleting && currentIdea?._id === idea._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIdeas;
