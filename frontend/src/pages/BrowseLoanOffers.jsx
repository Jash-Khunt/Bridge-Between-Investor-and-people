"use client";

import { useEffect, useState } from "react";
import { Search, Landmark, Percent, DollarSign, FileText } from "lucide-react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useLoanOfferStore } from "../store/loanOfferStore";

const BrowseLoanOffers = () => {
  const { loanOffers, getAllLoanOffers, isLoading } = useLoanOfferStore();

  const [filters, setFilters] = useState({
    loanType: "",
    maxInterestRate: "",
    minAmount: "",
    search: "",
  });

  useEffect(() => {
    getAllLoanOffers();
  }, [getAllLoanOffers]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredOffers = loanOffers.filter((offer) => {
    const matchesLoanType =
      !filters.loanType ||
      offer.loanType.toLowerCase().includes(filters.loanType.toLowerCase());
    const matchesInterestRate =
      !filters.maxInterestRate ||
      parseFloat(offer.interestRate) <= parseFloat(filters.maxInterestRate);
    const matchesAmount =
      !filters.minAmount || offer.maxAmount >= parseFloat(filters.minAmount);
    const matchesSearch =
      !filters.search ||
      offer.loanType.toLowerCase().includes(filters.search.toLowerCase()) ||
      offer.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      offer.bankerId.name.toLowerCase().includes(filters.search.toLowerCase());

    return (
      matchesLoanType && matchesInterestRate && matchesAmount && matchesSearch
    );
  });

  const loanTypes = [
    "Business Term Loan",
    "Startup Business Loan",
    "Equipment Finance",
    "Working Capital Loan",
    "MSME Loan",
    "Export Finance",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Loan Offers</h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover financing options from trusted banking partners
          </p>
        </div>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700"
              >
                Search
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-teal-500 focus:ring-teal-500"
                  placeholder="Search loans..."
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="loanType"
                className="block text-sm font-medium text-gray-700"
              >
                Loan Type
              </label>
              <select
                id="loanType"
                name="loanType"
                value={filters.loanType}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500"
              >
                <option value="">All Types</option>
                {loanTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="maxInterestRate"
                className="block text-sm font-medium text-gray-700"
              >
                Max Interest Rate (%)
              </label>
              <input
                type="number"
                id="maxInterestRate"
                name="maxInterestRate"
                value={filters.maxInterestRate}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                placeholder="e.g., 15"
                step="0.1"
              />
            </div>

            <div>
              <label
                htmlFor="minAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Min Amount (₹)
              </label>
              <input
                type="number"
                id="minAmount"
                name="minAmount"
                value={filters.minAmount}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                placeholder="e.g., 1000000"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOffers.map((offer) => (
              <div
                key={offer._id}
                className="overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Landmark className="h-5 w-5 text-teal-600" />
                      <span className="ml-2 text-sm font-medium text-teal-600">
                        {offer.bankerId.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
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

                  <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                    {offer.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-start">
                      <FileText className="mt-0.5 h-4 w-4 text-gray-400" />
                      <div className="ml-2">
                        <p className="text-xs text-gray-500">Eligibility</p>
                        <p className="text-sm text-gray-700">
                          {offer.eligibility}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="text-sm text-gray-500">
                      {offer.bankerId.location.city},{" "}
                      {offer.bankerId.location.state}
                    </div>
                    <button className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredOffers.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Landmark className="mx-auto h-16 w-16 text-gray-300" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No loan offers found
            </h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseLoanOffers;
