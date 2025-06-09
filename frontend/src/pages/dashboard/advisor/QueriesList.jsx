"use client";

import { useState, useEffect } from "react";
import {
  HelpCircle,
  MessageSquare,
  User,
  Calendar,
  CheckCircle,
} from "lucide-react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useQueryStore } from "../../../store/queryStore";

const QueriesList = () => {
  const { queries, getAllQueries, answerQuery, isLoading, isAnswering } =
    useQueryStore();

  const [filter, setFilter] = useState("unanswered");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    getAllQueries();
  }, [getAllQueries]);

  const handleAnswerSubmit = async (queryId) => {
    if (!answer.trim()) return;

    const result = await answerQuery(queryId, answer);
    if (result.success) {
      setSelectedQuery(null);
      setAnswer("");
    }
  };

  const filteredQueries = queries.filter((query) => {
    if (filter === "all") return true;
    return query.status === filter;
  });

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Entrepreneur Queries
        </h1>
        <p className="text-gray-600">
          Help entrepreneurs by answering their questions
        </p>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              {
                key: "unanswered",
                label: "Unanswered",
                count: queries.filter((q) => q.status === "unanswered").length,
              },
              {
                key: "answered",
                label: "Answered",
                count: queries.filter((q) => q.status === "answered").length,
              },
              { key: "all", label: "All", count: queries.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium ${
                  filter === tab.key
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredQueries.length === 0 ? (
        <div className="text-center py-12">
          <HelpCircle className="mx-auto h-16 w-16 text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No queries found
          </h3>
          <p className="mt-2 text-gray-600">
            {filter === "unanswered"
              ? "No unanswered queries at the moment."
              : `No ${filter} queries found.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQueries.map((query) => (
            <div
              key={query._id}
              className="overflow-hidden rounded-lg bg-white shadow-sm"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {query.entrepreneurId.name}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">
                        {query.entrepreneurId.email}
                      </span>
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      {query.question}
                    </h3>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>
                          Asked {new Date(query.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {query.status === "answered" && query.updatedAt && (
                        <div className="flex items-center">
                          <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                          <span>
                            Answered{" "}
                            {new Date(query.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {query.status === "answered" && query.answer && (
                      <div className="rounded-lg bg-green-50 p-4 mb-4">
                        <h4 className="text-sm font-medium text-green-800 mb-2">
                          Your Answer:
                        </h4>
                        <p className="text-green-700">{query.answer}</p>
                      </div>
                    )}

                    {selectedQuery === query._id ? (
                      <div className="mt-4">
                        <label
                          htmlFor="answer"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Your Answer
                        </label>
                        <textarea
                          id="answer"
                          rows={4}
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500"
                          placeholder="Provide a helpful and detailed answer..."
                        />
                        <div className="mt-3 flex space-x-3">
                          <button
                            onClick={() => {
                              setSelectedQuery(null);
                              setAnswer("");
                            }}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleAnswerSubmit(query._id)}
                            disabled={isAnswering || !answer.trim()}
                            className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:bg-teal-400"
                          >
                            {isAnswering ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              "Submit Answer"
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      query.status === "unanswered" && (
                        <button
                          onClick={() => setSelectedQuery(query._id)}
                          className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Answer Query
                        </button>
                      )
                    )}
                  </div>

                  <div className="ml-6">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        query.status === "answered"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {query.status === "answered" ? "Answered" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueriesList;
