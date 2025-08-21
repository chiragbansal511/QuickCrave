import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// An SVG icon for a better visual cue on the cards
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 ml-2 text-indigo-500 transition-transform duration-300 group-hover:translate-x-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function Hotellist() {
    const [hotellist, setHotellist] = useState([]);
    const navigate = useNavigate();

    async function gethotellist() {
        try {
            const response = await axios.get(
                'http://localhost:80/hotellist',
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("accessToken"),
                    },
                }
            );
            setHotellist(response.data);
        } catch (error) {
            console.error("Failed to fetch hotel list:", error);
            // If the token is invalid or expired, redirect to login
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                navigate('/login');
            }
        }
    }

    function handlesubmit(hotelname) {
        navigate('/getmenu', { state: { data: hotelname } });
    }

    useEffect(() => {
        gethotellist();
    }, []); // The empty dependency array ensures this effect runs only once on mount

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Consistent Navigation Bar */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-4">
                    <div className="text-2xl font-bold text-indigo-600">
                        Quickcrave
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="container mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Choose a Restaurant
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Select a restaurant to view its menu and place an order.
                    </p>
                </div>

                {/* Grid Layout for the Hotel List */}
                {hotellist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hotellist.map((hotel, index) => (
                            // Each hotel is a clickable card
                            <div
                                key={index}
                                onClick={() => handlesubmit(hotel.hotelname)}
                                className="group bg-white rounded-lg shadow-md p-6 flex items-center justify-between cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
                            >
                                <h2 className="text-xl font-bold text-gray-800">
                                    {hotel.hotelname}
                                </h2>
                                <ArrowRightIcon />
                            </div>
                        ))}
                    </div>
                ) : (
                    // A message to show while loading or if the list is empty
                    <div className="text-center text-gray-500 text-lg">
                        <p>Loading restaurants...</p>
                    </div>
                )}
            </main>
        </div>
    );
}