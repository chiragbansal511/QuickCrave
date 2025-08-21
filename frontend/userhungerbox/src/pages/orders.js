import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const socket = io('http://localhost:8080', {
  transports: ['websocket'],
});

socket.emit('joinroom', Cookies.get('hotelname'));

// A simple icon for the user
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

export default function Orders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on('order', (message) => {
      // Add a timestamp to the incoming message for display
      const newOrder = { ...message, timestamp: new Date() };
      // Prepend new orders to the top of the list
      setData(prevData => [newOrder, ...prevData]);
    });

    // Clean up event listener when component unmounts
    return () => {
      socket.off('order');
    };
  }, []); // Empty dependency array ensures effect runs only once

  const hotelName = Cookies.get("hotelname") || "Your Restaurant";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <p className="text-xl font-bold text-gray-800">{hotelName}</p>
            <p className="text-sm text-gray-500">Live Orders</p>
          </div>
          <Link to="/home" className="font-medium text-indigo-600 hover:text-indigo-800">
            &larr; Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Incoming Orders</h1>
          <p className="mt-2 text-lg text-gray-600">New orders will appear here in real-time.</p>
        </div>

        {/* Orders Feed */}
        <div className="space-y-6">
          {data.length > 0 ? (
            data.map((orderData, index) => (
              // Individual Order Card
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 animate-fade-in-down">
                {/* Card Header */}
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <div className="flex items-center">
                    <UserIcon />
                    <span className="text-xl font-bold text-gray-800">{orderData.user}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {orderData.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Items:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {orderData.order.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
                  <button className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700">
                    Decline
                  </button>
                  <button className="px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700">
                    Accept
                  </button>
                </div>
              </div>
            ))
          ) : (
            // Empty State
            <div className="text-center bg-white rounded-lg shadow-md p-12">
              <h2 className="text-2xl font-bold text-gray-500">Waiting for orders...</h2>
              <p className="mt-2 text-gray-400">This page will update automatically when a new order is placed.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// You would add this animation to your tailwind.config.js or a global CSS file.
/* 
@keyframes fade-in-down {
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
.animate-fade-in-down {
    animation: fade-in-down 0.5s ease-out forwards;
}
*/