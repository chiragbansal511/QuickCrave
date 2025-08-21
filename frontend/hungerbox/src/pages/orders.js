import React from "react";
import { Link } from "react-router-dom";

// A simple SVG checkmark icon for clear visual feedback
const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-green-500 mx-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function OrderComplete() {
  return (
    // Full-screen container that centers the content vertically and horizontally
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      {/* The main content card */}
      <div className="w-full max-w-md p-8 text-center bg-white rounded-xl shadow-lg">
        
        {/* Success Icon */}
        <div className="mb-4">
          <CheckCircleIcon />
        </div>
        
        {/* Main Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900">
          Order Placed!
        </h1>
        
        {/* Subheading/Description */}
        <p className="mt-3 text-lg text-gray-600">
          Thank you! The restaurant has received your order.
        </p>
        
        {/* Button to go back to the restaurant selection page */}
        <div className="mt-8">
          <Link
            to="/hotellist" // This route should lead to your restaurant list
            className="inline-block w-full px-6 py-4 text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Restaurants
          </Link>
        </div>
      </div>
    </div>
  );
}