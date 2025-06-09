"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useAdviceStore } from "../../../store/adviceStore";

const EditAdvice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAdviceById, updateAdvice, currentAdvice, isLoading, isUpdating } =
    useAdviceStore();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
  const categoryOptions = [
    "Fundraising",
    "Team Building",
    "Market Research",
    "Finance",
    "Marketing",
    "Legal",
    "Technology",
    "Operations",
    "Strategy",
    "Leadership",
    "Product Development",
    "Sales",
    "Other",
  ];

  useEffect(() => {
    if (id) {
      getAdviceById(id);
    }
  }, [id]);

  useEffect(() => {
    if (currentAdvice) {
      setFormData({
        title: currentAdvice.title || "",
        content: currentAdvice.content || "",
        category: currentAdvice.category || "",
      });
    }
  }, [currentAdvice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.content) newErrors.content = "Content is required";
    else if (formData.content.length < 100)
      newErrors.content = "Content should be at least 100 characters long";
    if (!formData.category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await updateAdvice(id, formData);
    if (result.success) {
      navigate("/dashboard/my-advice");
    } else {
      setErrors({
        ...errors,
        general: result.message || "Update failed. Please try again.",
      });
    }
  };

  if (isLoading || !currentAdvice) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard/my-advice")}
          className="mb-4 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to My Advice
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          Edit Advice Article
        </h1>
        <p className="text-gray-600">Update your advice article content</p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{errors.general}</p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.title ? "border-red-300" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.category ? "border-red-300" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500`}
              >
                <option value="">Select a category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Article Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              rows={12}
              value={formData.content}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.content ? "border-red-300" : "border-gray-300"
              } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500`}
              placeholder="Write your advice article here..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.content.length} characters (minimum 100 required)
            </p>
          </div>

          <div className="flex justify-end space-x-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-advice")}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-teal-400"
            >
              {isUpdating ? <LoadingSpinner size="sm" /> : "Update Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdvice;
