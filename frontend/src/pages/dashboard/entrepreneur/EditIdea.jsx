"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useBusinessIdeaStore } from "../../../store/businessIdeaStore";

const EditIdea = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentIdea, getIdeaById, updateIdea, isUpdating } =
    useBusinessIdeaStore();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    fundingRequired: "",
    expectedROI: "",
    pitchDeckUrl: "",
    status: "pending",
  });
  const [errors, setErrors] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchIdea = async () => {
      const data = await getIdeaById(id);
      if (data) {
        setFormData({
          title: data.title || "",
          category: data.category || "",
          description: data.description || "",
          fundingRequired: data.fundingRequired || "",
          expectedROI: data.expectedROI || "",
          pitchDeckUrl: data.pitchDeckUrl || "",
          status: data.status || "pending",
        });
      }
      setInitialLoading(false);
    };
    fetchIdea();
  }, [id, getIdeaById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.fundingRequired) {
      newErrors.fundingRequired = "Funding amount is required";
    } else if (
      isNaN(formData.fundingRequired) ||
      Number(formData.fundingRequired) <= 0
    ) {
      newErrors.fundingRequired = "Funding must be a positive number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await updateIdea(id, formData);
    if (result.success) {
      navigate("/dashboard/my-ideas");
    } else {
      setErrors({ general: result.message || "Update failed" });
    }
  };

  const categoryOptions = [
    "Technology",
    "Healthcare",
    "Education",
    "Finance",
    "E-commerce",
    "Sustainability",
    "Food & Beverage",
    "Transportation",
    "Real Estate",
    "Entertainment",
    "Manufacturing",
    "Agriculture",
    "CleanTech",
    "Other",
  ];

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in discussion", label: "In Discussion" },
    { value: "funded", label: "Funded" },
    { value: "rejected", label: "Rejected" },
  ];

  if (initialLoading) {
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
          onClick={() => navigate("/dashboard/my-ideas")}
          className="mb-4 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to My Ideas
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Edit Business Idea</h1>
        <p className="text-gray-600">Update your business idea details</p>
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
                Idea Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.title ? "border-red-300" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm`}
                placeholder="E.g., Eco-Friendly Food Packaging"
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
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.category ? "border-red-300" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm`}
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
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className={`mt-1 block w-full rounded-md border ${
                errors.description ? "border-red-300" : "border-gray-300"
              } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm`}
              placeholder="Describe your business idea..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label
                htmlFor="fundingRequired"
                className="block text-sm font-medium text-gray-700"
              >
                Funding Required (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="fundingRequired"
                value={formData.fundingRequired}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.fundingRequired ? "border-red-300" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm`}
              />
              {errors.fundingRequired && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.fundingRequired}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="expectedROI"
                className="block text-sm font-medium text-gray-700"
              >
                Expected ROI
              </label>
              <input
                type="text"
                name="expectedROI"
                value={formData.expectedROI}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="pitchDeck"
              className="block text-sm font-medium text-gray-700"
            >
              Pitch Deck (Optional)
            </label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="pitchDeck"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-teal-600 hover:text-teal-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="pitchDeck"
                      name="pitchDeck"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, PPT, or PPTX up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-ideas")}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:bg-teal-400"
            >
              {isUpdating ? <LoadingSpinner size="sm" /> : "Update Idea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIdea;
