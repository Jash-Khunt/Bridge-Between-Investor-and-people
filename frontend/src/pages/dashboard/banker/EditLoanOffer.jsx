"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useLoanOfferStore } from "../../../store/loanOfferStore";

const EditLoanOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLoanOfferById, updateLoanOffer, currentLoanOffer, isUpdating } =
    useLoanOfferStore();
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    loanType: "",
    interestRate: "",
    maxAmount: "",
    eligibility: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const loanTypeOptions = [
    "Business Term Loan",
    "Working Capital Loan",
    "Equipment Finance",
    "Startup Business Loan",
    "MSME Loan",
    "Export Finance",
    "Trade Finance",
    "Invoice Discounting",
    "Overdraft Facility",
    "Letter of Credit",
    "Other",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const offer = await getLoanOfferById(id);
      if (offer) {
        setFormData(offer);
      }
      setInitialLoading(false);
    };
    fetchData();
  }, [id, getLoanOfferById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.loanType) newErrors.loanType = "Loan type is required";
    if (!formData.interestRate) {
      newErrors.interestRate = "Interest rate is required";
    } else if (!/^[\d.]+%?$/.test(formData.interestRate)) {
      newErrors.interestRate =
        "Invalid interest rate format (e.g., 12.5 or 12.5%)";
    }
    if (
      formData.maxAmount &&
      (isNaN(formData.maxAmount) || Number(formData.maxAmount) <= 0)
    ) {
      newErrors.maxAmount = "Maximum amount must be a positive number";
    }
    if (!formData.description)
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const result = await updateLoanOffer(id, formData);
    if (result.success) {
      navigate("/dashboard/my-loan-offers");
    }
  };

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
          onClick={() => navigate("/dashboard/my-loan-offers")}
          className="mb-4 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to My Loan Offers
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Edit Loan Offer</h1>
        <p className="text-gray-600">Update your loan product details</p>
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
                htmlFor="loanType"
                className="block text-sm font-medium text-gray-700"
              >
                Loan Type <span className="text-red-500">*</span>
              </label>
              <select
                id="loanType"
                name="loanType"
                value={formData.loanType}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.loanType ? "border-red-300" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500`}
              >
                <option value="">Select loan type</option>
                {loanTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.loanType && (
                <p className="mt-1 text-sm text-red-600">{errors.loanType}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="interestRate"
                className="block text-sm font-medium text-gray-700"
              >
                Interest Rate <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="interestRate"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.interestRate ? "border-red-300" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500`}
                placeholder="e.g., 12.5% or 12.5"
              />
              {errors.interestRate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.interestRate}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="maxAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Maximum Loan Amount (₹)
            </label>
            <input
              type="number"
              id="maxAmount"
              name="maxAmount"
              value={formData.maxAmount}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.maxAmount ? "border-red-300" : "border-gray-300"
              } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500`}
              placeholder="e.g., 5000000"
            />
            {errors.maxAmount && (
              <p className="mt-1 text-sm text-red-600">{errors.maxAmount}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Leave empty if no maximum limit
            </p>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.description ? "border-red-300" : "border-gray-300"
              } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500`}
              placeholder="Describe the loan product, its features, and benefits..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="eligibility"
              className="block text-sm font-medium text-gray-700"
            >
              Eligibility Criteria
            </label>
            <textarea
              id="eligibility"
              name="eligibility"
              rows={3}
              value={formData.eligibility}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500"
              placeholder="e.g., Minimum 2 years in business, Annual turnover of ₹50L+, Good credit score..."
            />
          </div>

          <div className="flex justify-end space-x-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-loan-offers")}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-teal-400"
            >
              {isUpdating ? <LoadingSpinner size="sm" /> : "Update Loan Offer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLoanOffer;
