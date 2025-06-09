"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Landmark,
  Percent,
  DollarSign,
} from "lucide-react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useLoanOfferStore } from "../../../store/loanOfferStore";
import { useAuthStore } from "../../../store/authStore";

const MyLoanOffers = () => {
  const { user } = useAuthStore();
  const {
    loanOffers,
    isLoading,
    isDeleting,
    getAllLoanOffers,
    deleteLoanOffer,
  } = useLoanOfferStore();

  useEffect(() => {
    if (user?._id) {
      getAllLoanOffers({ bankerId: user._id });
    }
  }, [getAllLoanOffers, user?._id]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this loan offer?")) {
      await deleteLoanOffer(id);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Loan Offers</h1>
          <p className="text-gray-600">
            Manage your loan products and offerings
          </p>
        </div>
        <Link
          to="/dashboard/create-loan-offer"
          className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Loan Offer
        </Link>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : loanOffers.length === 0 ? (
        <div className="text-center py-12">
          <Landmark className="mx-auto h-16 w-16 text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No loan offers yet
          </h3>
          <p className="mt-2 text-gray-600">
            Create your first loan offer to attract potential borrowers.
          </p>
          <Link
            to="/dashboard/create-loan-offer"
            className="mt-4 inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Offer
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loanOffers.map((offer) => (
            <div
              key={offer._id}
              className="overflow-hidden rounded-lg bg-white shadow-sm"
            >
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Landmark className="h-5 w-5 text-teal-600" />
                    <span className="ml-2 text-sm font-medium text-teal-600">
                      Loan Product
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(offer.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="mb-4 text-xl font-bold text-gray-900 flex items-center justify-between">
                  <span>{offer.loanType}</span>
                  <span className="text-sm font-normal text-gray-600">
                    Banker: {offer.bankerId?.name || "Unknown"}
                  </span>
                </h3>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Percent className="h-4 w-4 text-gray-400" />
                    <div className="ml-2">
                      <p className="text-xs text-gray-500">Interest Rate</p>
                      <p className="font-medium text-gray-900">
                        {offer.interestRate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <div className="ml-2">
                      <p className="text-xs text-gray-500">Max Amount</p>
                      <p className="font-medium text-gray-900">
                        ₹{(offer.maxAmount / 100000).toFixed(1)}L
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Description</p>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {offer.description}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-1">
                    Eligibility Criteria
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {offer.eligibility}
                  </p>
                </div>

                {offer.updatedAt !== offer.createdAt && (
                  <div className="mb-4">
                    <span className="text-xs text-gray-500">
                      Updated {new Date(offer.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between border-t border-gray-100 pt-4">
                  <Link
                    to={`/dashboard/edit-loan-offer/${offer._id}`}
                    className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                  >
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(offer._id)}
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

export default MyLoanOffers;
