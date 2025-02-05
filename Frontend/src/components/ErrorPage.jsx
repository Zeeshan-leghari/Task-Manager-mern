import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center my-40 ">
      <div className="text-center bg-white shadow-xl p-12 rounded-xl   ">
        <div className="text-6xl text-red-600 mb-6">404 ERROR😞</div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Oops! Something Went Wrong
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          We couldn't find the page you're looking for. Please check the URL or go back to the home page.
        </p>
        <Link
          to="/"
          className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xl transition-all duration-300 transform hover:scale-110"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
