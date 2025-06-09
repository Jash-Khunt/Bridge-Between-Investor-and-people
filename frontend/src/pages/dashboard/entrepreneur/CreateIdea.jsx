"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBusinessIdeaStore } from "../../../store/businessIdeaStore";
import toast from "react-hot-toast";

const CreateIdea = () => {
  const navigate = useNavigate();
  const { createIdea, isCreating } = useBusinessIdeaStore();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    fundingRequired: "",
    expectedROI: "",
    pitchDeckUrl: "",
  });

  const categories = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "E-commerce",
    "Food & Beverage",
    "Real Estate",
    "Manufacturing",
    "Agriculture",
    "Entertainment",
    "Transportation",
    "Energy",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.description ||
      !formData.fundingRequired
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (
      isNaN(formData.fundingRequired) ||
      Number(formData.fundingRequired) <= 0
    ) {
      toast.error("Funding amount must be a valid positive number");
      return;
    }

    const dataToSend = {
      ...formData,
      fundingRequired: Number(formData.fundingRequired),
    };

    const result = await createIdea(dataToSend);

    if (result.success) {
      navigate("/dashboard/my-ideas");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Business Idea
          </h1>
          <p className="text-gray-600">
            Share your innovative business idea with potential investors
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Business Idea Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter a compelling title for your business idea"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={6}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Provide a detailed description of your business idea, including the problem it solves, target market, and unique value proposition"
            />
          </div>

          <div>
            <label
              htmlFor="fundingRequired"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Funding Required (₹) *
            </label>
            <input
              type="number"
              id="fundingRequired"
              name="fundingRequired"
              required
              min="1"
              value={formData.fundingRequired}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the amount of funding needed"
            />
          </div>

          <div>
            <label
              htmlFor="expectedROI"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Expected ROI
            </label>
            <input
              type="text"
              id="expectedROI"
              name="expectedROI"
              value={formData.expectedROI}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 20% annually, 3x in 5 years"
            />
          </div>

          <div>
            <label
              htmlFor="pitchDeckUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Pitch Deck URL
            </label>
            <input
              type="url"
              id="pitchDeckUrl"
              name="pitchDeckUrl"
              value={formData.pitchDeckUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/pitch-deck.pdf"
            />
            <p className="text-sm text-gray-500 mt-1">
              Optional: Link to your pitch deck or presentation
            </p>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isCreating}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isCreating ? "Creating..." : "Create Business Idea"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/my-ideas")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIdea;
