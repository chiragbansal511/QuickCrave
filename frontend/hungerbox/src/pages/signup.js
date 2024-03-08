
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Signup()
{   
  const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [hotelname, setHotelname] = useState('');
    const [password, setPassword] = useState('');
  
    async function handleSubmit(e){
      e.preventDefault();
      
      const response = await axios.post('http://localhost:80/signup/admin', {
        name: username,
        email : email,
        hotelname : hotelname,
        password: password
      });
      if(response.data === "already exists")
      {
        alert("username already exists");
        setUsername("");
        setHotelname("");
      }
      else {
        Cookies.set("accessToken" , response.data.accessToken);
        Cookies.set("hotelname" , hotelname);
        navigate('/home')
      window.location.reload();
      }
    };


    return (
        <div>
            <h2>Signup</h2>
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
            <label htmlFor="email">email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="hotel name">Hotel Name:</label>
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
          <button type="submit">Signup</button>
        </form>
        </div>
    );
}