"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useQueryStore } from "../../../store/queryStore";
import toast from "react-hot-toast";

const AskQuery = () => {
  const user = useAuthStore((state) => state.user);
  const [newQuery, setNewQuery] = useState("");

  const { queries, isLoading, isCreating, getAllQueries, createQuery } =
    useQueryStore();

  useEffect(() => {
    if (user?._id) {
      getAllQueries({ entrepreneurId: user._id });
    }
  }, [user]);

  const handleSubmitQuery = async (e) => {
    e.preventDefault();

    if (!newQuery.trim()) {
      toast.error("Please enter your question");
      return;
    }

    const result = await createQuery({ question: newQuery.trim() });

    if (result.success) {
      setNewQuery("");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ask a Question</h1>
        <p className="text-gray-600 mt-2">
          Get expert advice from experienced advisors
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Submit Your Question
        </h2>
        <form onSubmit={handleSubmitQuery}>
          <div className="mb-4">
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Question *
            </label>
            <textarea
              id="question"
              rows={4}
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ask your business-related question here. Be specific to get better advice..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={isCreating}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isCreating ? "Submitting..." : "Submit Question"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Your Previous Questions
        </h2>

        {queries.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">❓</div>
            <p className="text-gray-600">No questions submitted yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {queries.map((query) => (
              <div
                key={query._id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">Your Question:</h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        query.status === "answered"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {query.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(query.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg">
                  {query.question}
                </p>

                {query.status === "answered" && query.answer && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">Answer:</h4>
                      {query.advisorId && (
                        <span className="text-sm text-gray-600">
                          by {query.advisorId.name}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
                      {query.answer}
                    </p>
                  </div>
                )}

                {query.status === "unanswered" && (
                  <div className="border-t pt-4">
                    <p className="text-gray-600 text-sm italic">
                      Waiting for an advisor to answer your question...
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AskQuery;
