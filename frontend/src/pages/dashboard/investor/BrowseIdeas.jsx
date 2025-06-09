"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, AlertCircle } from "lucide-react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useBusinessIdeaStore } from "../../../store/businessIdeaStore.js";
const BrowseIdeas = () => {
  const { ideas, isLoading, getAllIdeas } = useBusinessIdeaStore();
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    fundingMin: "",
    fundingMax: "",
    search: "",
  });

  useEffect(() => {
    getAllIdeas();
  }, [getAllIdeas]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = (idea) => {
    if (
      filters.search &&
      !idea.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !idea.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    if (filters.category && idea.category !== filters.category) {
      return false;
    }

    if (
      filters.fundingMin &&
      idea.fundingRequired < Number(filters.fundingMin)
    ) {
      return false;
    }
    if (
      filters.fundingMax &&
      idea.fundingRequired > Number(filters.fundingMax)
    ) {
      return false;
    }

    return true;
  };

  const filteredIdeas = ideas.filter(applyFilters);

  const categoryOptions = [
    "",
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
  ];

  const clearFilters = () => {
    setFilters({
      category: "",
      fundingMin: "",
      fundingMax: "",
      search: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Browse Business Ideas
        </h1>
        <p className="text-gray-600 mt-2">
          Discover innovative business ideas from entrepreneurs
        </p>
      </div>


      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
     
          <div className="lg:col-span-2">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                value={filters.search}
                onChange={handleFilterChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Search ideas..."
              />
            </div>
          </div>

 
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
            >
              <option value="">All Categories</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="fundingMin"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Min Funding (₹)
            </label>
            <input
              type="number"
              id="fundingMin"
              name="fundingMin"
              value={filters.fundingMin}
              onChange={handleFilterChange}
              min="0"
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Min"
            />
          </div>

          <div>
            <label
              htmlFor="fundingMax"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Max Funding (₹)
            </label>
            <input
              type="number"
              id="fundingMax"
              name="fundingMax"
              value={filters.fundingMax}
              onChange={handleFilterChange}
              min="0"
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <div className="bg-red-50 rounded-lg p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-red-800">
            Error loading ideas
          </h3>
          <p className="mt-2 text-sm text-red-600">{error}</p>
          <button
            onClick={getAllIdeas}
            className="mt-4 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      ) : filteredIdeas.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
            <Filter className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">
            No ideas found
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            {Object.values(filters).some(Boolean)
              ? "Try adjusting your filters"
              : "No business ideas available yet"}
          </p>
          {Object.values(filters).some(Boolean) && (
            <button
              onClick={clearFilters}
              className="mt-4 inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredIdeas.map((idea) => (
            <Link
              key={idea._id}
              to={`/dashboard/idea/${idea._id}`}
              className="group rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-teal-100 px-3 py-0.5 text-sm font-medium text-teal-800">
                    {idea.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-teal-600">
                  {idea.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {idea.description}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500">
                      Funding Required
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{idea.fundingRequired?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">
                      Expected ROI
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {idea.expectedROI || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center border-t border-gray-100 pt-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        idea.entrepreneurId?.name || "Unknown"
                      )}&background=0D9488&color=fff`}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {idea.entrepreneurId?.name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {idea.entrepreneurId?.location?.city || "Unknown"},{" "}
                      {idea.entrepreneurId?.location?.state || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseIdeas;
