"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  MessageCircle,
  FileText,
} from "lucide-react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useBusinessIdeaStore } from "../../../store/businessIdeaStore.js";
import { useConnectionStore } from "../../../store/connectionStore.js";
import toast from "react-hot-toast";

const IdeaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentIdea: idea,
    isLoading,
    getIdeaById,
    clearCurrentIdea,
  } = useBusinessIdeaStore();
  const { requestConnection, isRequesting } = useConnectionStore();
  const [connectionMessage, setConnectionMessage] = useState("");
  const [showConnectionForm, setShowConnectionForm] = useState(false);

  useEffect(() => {
    if (id) {
      getIdeaById(id);
    }

    return () => {
      clearCurrentIdea();
    };
  }, [id, getIdeaById, clearCurrentIdea]);

  const handleConnectionRequest = async (e) => {
    e.preventDefault();

    if (!id) {
      toast.error("Business idea ID is missing");
      return;
    }

    try {
      const result = await requestConnection(id, connectionMessage);

      if (result.success) {
        setShowConnectionForm(false);
        setConnectionMessage("");
        toast.success("Connection request sent successfully!");
      }
    } catch (error) {
      console.error("Error sending connection request:", error);
      toast.error("Failed to send connection request. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Idea not found</h2>
          <button
            onClick={() => navigate("/dashboard/browse-ideas")}
            className="mt-4 text-teal-600 hover:text-teal-700"
          >
            Back to Browse Ideas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <button
        onClick={() => navigate("/dashboard/browse-ideas")}
        className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Browse Ideas
      </button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-800">
                  {idea.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(idea.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{idea.title}</h1>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-teal-600" />
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    Funding Required
                  </span>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  ₹{idea.fundingRequired?.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    Expected ROI
                  </span>
                </div>
                <p className="mt-2 text-lg font-bold text-gray-900">
                  {idea.expectedROI || "N/A"}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-teal-600" />
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    Status
                  </span>
                </div>
                <p className="mt-2 text-lg font-bold capitalize text-gray-900">
                  {idea.status}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Business Description
              </h2>
              <div className="prose max-w-none text-gray-700">
                {idea.description.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {idea.pitchDeckUrl && (
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Pitch Deck
                </h2>
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-6">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-gray-400" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        Business Pitch Deck
                      </p>
                      <p className="text-sm text-gray-500">PDF Document</p>
                    </div>
                    <button className="ml-auto rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Entrepreneur
            </h3>
            <div className="flex items-center">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  idea.entrepreneurId?.name || "Unknown"
                )}&background=0D9488&color=fff`}
                alt={idea.entrepreneurId?.name || "Unknown"}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4">
                <h4 className="text-base font-medium text-gray-900">
                  {idea.entrepreneurId?.name || "Unknown"}
                </h4>
                <p className="text-sm text-gray-500">
                  {idea.entrepreneurId?.email || "N/A"}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="mr-2 h-4 w-4" />
                <span>
                  {idea.entrepreneurId?.location?.city || "Unknown"},{" "}
                  {idea.entrepreneurId?.location?.state || "Unknown"}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <User className="mr-2 h-4 w-4" />
                <span>{idea.entrepreneurId?.phone || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Interested in this idea?
            </h3>

            {!showConnectionForm ? (
              <button
                onClick={() => setShowConnectionForm(true)}
                className="w-full rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                disabled={idea.status === "funded"}
              >
                <MessageCircle className="mr-2 inline h-4 w-4" />
                {idea.status === "funded"
                  ? "Idea Already Funded"
                  : "Send Connection Request"}
              </button>
            ) : (
              <form onSubmit={handleConnectionRequest}>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message to Entrepreneur
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={connectionMessage}
                    onChange={(e) => setConnectionMessage(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500"
                    placeholder="Introduce yourself and explain your interest in this business idea..."
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowConnectionForm(false);
                      setConnectionMessage("");
                    }}
                    className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isRequesting}
                    className="flex-1 rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:bg-teal-400"
                  >
                    {isRequesting ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      "Send Request"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetails;
