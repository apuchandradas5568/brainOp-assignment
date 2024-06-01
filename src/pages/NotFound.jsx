import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found container mx-auto px-4 py-16 flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">
        404: Page Not Found
      </h1>
      <p className="text-gray-700 text-center text-lg">
        The page you requested could not be found. It might be unavailable or
        removed.
      </p>

      <Link
        to={"/"}
        className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-8"
      >
        Go Back to Login
      </Link>
    </div>
  );
};

export default NotFound;
