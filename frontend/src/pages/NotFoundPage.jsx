import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-teal-600">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div className="mb-8">
          <img
            src="/placeholder.svg?height=300&width=400"
            alt="Page not found"
            className="mx-auto h-64 w-auto opacity-50"
          />
        </div>

        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
