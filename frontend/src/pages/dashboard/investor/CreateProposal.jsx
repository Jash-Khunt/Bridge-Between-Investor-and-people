"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useProposalStore } from "../../../store/proposalStore";

const CreateProposal = () => {
  const navigate = useNavigate();
  const { createProposal, isCreating } = useProposalStore();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sectorsOfInterest: [],
    investmentRange: { min: "", max: "" },
    expectedROI: "",
    investmentHorizon: "",
    proposalNote: "",
  });

  const [errors, setErrors] = useState({});

  const sectorOptions = [
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSectorChange = (sector) => {
    const updatedSectors = formData.sectorsOfInterest.includes(sector)
      ? formData.sectorsOfInterest.filter((s) => s !== sector)
      : [...formData.sectorsOfInterest, sector];

    setFormData({ ...formData, sectorsOfInterest: updatedSectors });

    if (errors.sectorsOfInterest) {
      setErrors({ ...errors, sectorsOfInterest: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.sectorsOfInterest.length === 0) {
      newErrors.sectorsOfInterest = "Please select at least one sector";
    }

    if (!formData.investmentRange.min) {
      newErrors["investmentRange.min"] = "Minimum investment is required";
    } else if (
      isNaN(formData.investmentRange.min) ||
      Number(formData.investmentRange.min) <= 0
    ) {
      newErrors["investmentRange.min"] =
        "Minimum investment must be a positive number";
    }

    if (!formData.investmentRange.max) {
      newErrors["investmentRange.max"] = "Maximum investment is required";
    } else if (
      isNaN(formData.investmentRange.max) ||
      Number(formData.investmentRange.max) <= 0
    ) {
      newErrors["investmentRange.max"] =
        "Maximum investment must be a positive number";
    } else if (
      Number(formData.investmentRange.max) <=
      Number(formData.investmentRange.min)
    ) {
      newErrors["investmentRange.max"] = "Maximum must be greater than minimum";
    }

    if (!formData.expectedROI) {
      newErrors.expectedROI = "Expected ROI is required";
    }

    if (!formData.investmentHorizon) {
      newErrors.investmentHorizon = "Investment horizon is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const result = await createProposal(formData);
        if (result.success) {
          navigate("/dashboard/my-proposals");
        } else {
          setErrors({
            ...errors,
            general: result.message || "Failed to create proposal.",
          });
        }
      } catch (error) {
        console.error("Unexpected error creating proposal:", error);
        setErrors({
          ...errors,
          general: "An unexpected error occurred. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard/my-proposals")}
          className="mb-4 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to My Proposals
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          Create Investment Proposal
        </h1>
        <p className="text-gray-600">
          Define your investment criteria to attract suitable entrepreneurs
        </p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{errors.general}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sectors of Interest <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Select all sectors you're interested in investing in
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {sectorOptions.map((sector) => (
                <label key={sector} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.sectorsOfInterest.includes(sector)}
                    onChange={() => handleSectorChange(sector)}
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{sector}</span>
                </label>
              ))}
            </div>
            {errors.sectorsOfInterest && (
              <p className="mt-1 text-sm text-red-600">
                {errors.sectorsOfInterest}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Investment Range (₹) <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="investmentRange.min"
                  className="block text-sm font-medium text-gray-700"
                >
                  Minimum Investment
                </label>
                <input
                  type="number"
                  id="investmentRange.min"
                  name="investmentRange.min"
                  value={formData.investmentRange.min}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors["investmentRange.min"]
                      ? "border-red-300"
                      : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500`}
                  placeholder="e.g., 100000"
                />
                {errors["investmentRange.min"] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors["investmentRange.min"]}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="investmentRange.max"
                  className="block text-sm font-medium text-gray-700"
                >
                  Maximum Investment
                </label>
                <input
                  type="number"
                  id="investmentRange.max"
                  name="investmentRange.max"
                  value={formData.investmentRange.max}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors["investmentRange.max"]
                      ? "border-red-300"
                      : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500`}
                  placeholder="e.g., 1000000"
                />
                {errors["investmentRange.max"] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors["investmentRange.max"]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="expectedROI"
                className="block text-sm font-medium text-gray-700"
              >
                Expected ROI <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="expectedROI"
                name="expectedROI"
                value={formData.expectedROI}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.expectedROI ? "border-red-300" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500`}
                placeholder="e.g., 20-30% annually"
              />
              {errors.expectedROI && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.expectedROI}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="investmentHorizon"
                className="block text-sm font-medium text-gray-700"
              >
                Investment Horizon <span className="text-red-500">*</span>
              </label>
              <select
                id="investmentHorizon"
                name="investmentHorizon"
                value={formData.investmentHorizon}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.investmentHorizon
                    ? "border-red-300"
                    : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500`}
              >
                <option value="">Select investment horizon</option>
                <option value="1-2 years">1-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-7 years">5-7 years</option>
                <option value="7+ years">7+ years</option>
              </select>
              {errors.investmentHorizon && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.investmentHorizon}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="proposalNote"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Notes
            </label>
            <textarea
              id="proposalNote"
              name="proposalNote"
              rows={4}
              value={formData.proposalNote}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500"
              placeholder="Describe your investment philosophy, what you look for in startups, and any additional criteria..."
            />
          </div>

          <div className="flex justify-end space-x-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-proposals")}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || isCreating}
              className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-teal-400"
            >
              {loading || isCreating ? (
                <LoadingSpinner size="sm" />
              ) : (
                "Create Proposal"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProposal;
