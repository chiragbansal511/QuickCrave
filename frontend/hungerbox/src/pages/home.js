import { Link } from "react-router-dom"; // Import Link for navigation

export default function Home() {
  return (
    // Main container for the page
    <div className="min-h-screen bg-gray-100">
      
      {/* A simple navigation bar example */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="text-2xl font-bold text-indigo-600">
            Quickcrave
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Your Dashboard
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Ready to find your next destination? Browse our curated list of hotels.
          </p>
          
          {/* Button to navigate to the hotel list */}
          <div className="mt-8">
            <Link 
              to="/hotellist" // Set the destination URL for the hotel list
              className="inline-block px-8 py-4 text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Browse Hotel List
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}