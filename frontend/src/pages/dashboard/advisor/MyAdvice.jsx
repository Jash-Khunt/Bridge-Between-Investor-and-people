"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, MessageSquare, Eye } from "lucide-react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useAdviceStore } from "../../../store/adviceStore";
import { useAuthStore } from "../../../store/authStore";

const MyAdvice = () => {
  const { user } = useAuthStore();
  const { adviceList, isLoading, isDeleting, getAllAdvice, deleteAdvice } =
    useAdviceStore();

  useEffect(() => {
    if (user?._id) {
      getAllAdvice({ advisorId: user._id });
    }
  }, [getAllAdvice, user]);

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this advice article?")
    ) {
      await deleteAdvice(id);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            My Advice Articles
          </h1>
          <p className="text-gray-600">
            Manage your published advice and insights
          </p>
        </div>
        <Link
          to="/dashboard/create-advice"
          className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Article
        </Link>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : adviceList.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-16 w-16 text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No advice articles yet
          </h3>
          <p className="mt-2 text-gray-600">
            Share your expertise by creating your first advice article.
          </p>
          <Link
            to="/dashboard/create-advice"
            className="mt-4 inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Article
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adviceList.map((article) => (
            <div
              key={article._id}
              className="overflow-hidden rounded-lg bg-white shadow-sm"
            >
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-800">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {article.title}
                </h3>

                <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                  {article.content}
                </p>

                {article.updatedAt !== article.createdAt && (
                  <div className="mb-4">
                    <span className="text-xs text-gray-500">
                      Updated {new Date(article.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex space-x-2">
                    <Link
                      to={`/advice/${article._id}`}
                      className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Link>
                    <Link
                      to={`/dashboard/edit-advice/${article._id}`}
                      className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                    >
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </Link>
                  </div>
                  <button
                    onClick={() => handleDelete(article._id)}
                    disabled={isDeleting}
                    className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    {isDeleting ? "Deleting..." : "Delete"}
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

export default MyAdvice;
