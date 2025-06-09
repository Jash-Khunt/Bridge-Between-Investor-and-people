"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, ArrowRight } from "lucide-react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useAdviceStore } from "../store/adviceStore";

const BrowseAdvice = () => {
  const [filters, setFilters] = useState({ category: "", search: "" });

  const { adviceList, isLoading, getAllAdvice } = useAdviceStore();

  useEffect(() => {
    const fetchAdvice = async () => {
      await getAllAdvice(filters);
    };
    fetchAdvice();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const categories = [
    "Fundraising",
    "Team Building",
    "Market Research",
    "Finance",
    "Marketing",
    "Legal",
    "Technology",
    "Operations",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Expert Advice</h1>
          <p className="mt-2 text-lg text-gray-600">
            Learn from experienced advisors and industry experts
          </p>
        </div>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-y-0 md:space-x-4">
            <div className="flex-1">
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
                  placeholder="Search advice articles..."
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adviceList.map((item) => (
              <Link
                key={item._id}
                to={`/advice/${item._id}`}
                className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-800">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-teal-600">
                    {item.title}
                  </h3>

                  <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                    {item.content}
                  </p>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400" />
                      <div className="ml-2">
                        <p className="text-sm font-medium text-gray-900">
                          {item.advisorId?.name || "Unknown Advisor"}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-teal-600" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {adviceList.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No advice found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseAdvice;
