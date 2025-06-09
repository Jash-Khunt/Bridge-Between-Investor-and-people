"use client";

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Calendar, Tag, Share2 } from "lucide-react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useAdviceStore } from "../store/adviceStore";

const AdviceDetails = () => {
  const { id } = useParams();

  const { currentAdvice: advice, getAdviceById, isLoading } = useAdviceStore();

  useEffect(() => {
    if (id) {
      getAdviceById(id);
    }
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: advice.title,
        text: `Check out this advice: ${advice.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!advice) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Advice not found</h2>
          <Link to="/advice" className="mt-4 text-teal-600 hover:text-teal-700">
            Back to advice
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/advice"
          className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Advice
        </Link>

        <article className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-800">
                <Tag className="mr-1 h-4 w-4" />
                {advice.category}
              </span>
              <button
                onClick={handleShare}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </button>
            </div>

            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {advice.title}
            </h1>

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                <span>{advice.advisorId?.name}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <span>{new Date(advice.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: advice.content }}
            />
          </div>

          <div className="border-t border-gray-200 bg-gray-50 px-6 py-6">
            <div className="flex items-center">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  advice.advisorId?.name || "Advisor"
                )}&background=0D9488&color=fff`}
                alt={advice.advisorId?.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {advice.advisorId?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {advice.advisorId?.location?.city},{" "}
                  {advice.advisorId?.location?.state}
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default AdviceDetails;
