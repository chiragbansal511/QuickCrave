import React from "react";
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


export default function Login()
{
  const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hotelname, setHotelname] = useState('');
  
    async function handleSubmit(e){
      e.preventDefault();
      
      const response = await axios.post('http://localhost:80/login/admin', {
        username: username,
        password: password,
        hotelname : hotelname
      });
      
      Cookies.set("accessToken" , response.data.accessToken);
      Cookies.set("hotelname" , hotelname);
      navigate("/home");
      window.location.reload();
    };

    return(
        <div className="">
        <h2 className=" text-red-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Hotel Name">Hotel Name:</label>
            <input
              type="text"
              id="hotelname"
              value={hotelname}
              onChange={(e) => setHotelname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
}