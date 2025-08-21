import React from "react";
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hotelname, setHotelname] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:80/login/admin', {
        username: username,
        password: password,
        hotelname: hotelname
      });

      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("hotelname", hotelname);
      navigate("/home"); // Or perhaps to an admin dashboard
      window.location.reload();
    } catch (error) {
      console.error("Admin login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    // Main container to center the content
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      {/* App Title */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-600">
          Quickcrave
        </h1>
        <p className="mt-2 text-xl text-gray-600">
          Admin Portal
        </p>
      </div>

      {/* Login Form Container */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Hotel Name Field */}
          <div>
            <label htmlFor="hotelname" className="block text-sm font-medium text-gray-700">
              Hotel Name:
            </label>
            <input
              type="text"
              id="hotelname"
              value={hotelname}
              onChange={(e) => setHotelname(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}