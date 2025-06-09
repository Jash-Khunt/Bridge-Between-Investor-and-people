"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, TrendingUp, DollarSign } from "lucide-react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useProposalStore } from "../../../store/proposalStore";
import toast from "react-hot-toast";

const MyProposals = () => {
  const { proposals, isLoading, isDeleting, getAllProposals, deleteProposal } =
    useProposalStore();
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    getAllProposals();
  }, [getAllProposals]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this proposal?")) {
      try {
        setDeletingId(id);
        await deleteProposal(id);
        toast.success("Proposal deleted successfully");
      } catch (error) {
        toast.error("Failed to delete proposal");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            My Investment Proposals
          </h1>
          <p className="text-gray-600">
            Manage your investment criteria and preferences
          </p>
        </div>
        <Link
          to="/dashboard/create-proposal"
          className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Proposal
        </Link>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : proposals.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 py-12 text-center">
          <TrendingUp className="mx-auto h-16 w-16 text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No proposals yet
          </h3>
          <p className="mt-2 text-gray-600">
            Create your first investment proposal to attract entrepreneurs.
          </p>
          <Link
            to="/dashboard/create-proposal"
            className="mt-4 inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Proposal
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {proposals.map((proposal) => (
            <div
              key={proposal._id}
              className="overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Created {new Date(proposal.createdAt).toLocaleDateString()}
                  </span>
                  {proposal.updatedAt !== proposal.createdAt && (
                    <span className="text-sm text-gray-500">
                      Updated{" "}
                      {new Date(proposal.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    Investment Criteria
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {proposal.sectorsOfInterest?.map((sector, index) => (
                      <span
                        key={index}
                        className="inline-flex rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-800"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <div className="ml-2">
                      <p className="text-xs text-gray-500">Investment Range</p>
                      <p className="font-medium text-gray-900">
                        ₹
                        {proposal.investmentRange?.min
                          ? (proposal.investmentRange.min / 100000).toFixed(1)
                          : 0}
                        L - ₹
                        {proposal.investmentRange?.max
                          ? (proposal.investmentRange.max / 100000).toFixed(1)
                          : 0}
                        L
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <div className="ml-2">
                      <p className="text-xs text-gray-500">Expected ROI</p>
                      <p className="font-medium text-gray-900">
                        {proposal.expectedROI || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="mb-1 text-xs text-gray-500">
                    Investment Horizon
                  </p>
                  <p className="text-sm text-gray-700">
                    {proposal.investmentHorizon || "N/A"}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="mb-1 text-xs text-gray-500">Notes</p>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {proposal.proposalNote || "No notes provided"}
                  </p>
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-4">
                  <Link
                    to={`/dashboard/edit-proposal/${proposal._id}`}
                    className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                  >
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(proposal._id)}
                    disabled={isDeleting && deletingId === proposal._id}
                    className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                  >
                    {isDeleting && deletingId === proposal._id ? (
                      <LoadingSpinner size="sm" className="mr-1" />
                    ) : (
                      <Trash2 className="mr-1 h-4 w-4" />
                    )}
                    Delete
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

export default MyProposals;
