import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"; // Import to get the hotel name

// Icon for the "Set Menu" button
const CogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

// Icon for the "Check Orders" button
const ClipboardListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

export default function Home() {
    const hotelName = Cookies.get("hotelname") || "Your Restaurant";

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Admin-specific Navigation Bar */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div>
                        <p className="text-xl font-bold text-gray-800">{hotelName}</p>
                        <p className="text-sm text-gray-500">Admin Dashboard</p>
                    </div>
                    {/* You can add a logout button here */}
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="container mx-auto px-6 py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Welcome, Admin!
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                        Manage your restaurant's menu and incoming orders from here.
                    </p>
                </div>

                {/* Grid container for action cards */}
                <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Card 1: Menu Management */}
                    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Menu Management</h2>
                        <p className="text-gray-600 mb-6 flex-grow">
                            Add, edit, or remove items from your restaurant's menu.
                        </p>
                        <Link
                            to="/setmenu"
                            className="w-full flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                        >
                            <CogIcon />
                            Set Menu
                        </Link>
                    </div>

                    {/* Card 2: Order Management */}
                    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Management</h2>
                        <p className="text-gray-600 mb-6 flex-grow">
                            View and manage all incoming customer orders.
                        </p>
                        <Link
                            to="/order" // This should be the route to your admin orders component
                            className="w-full flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700"
                        >
                            <ClipboardListIcon />
                            Check Orders
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}