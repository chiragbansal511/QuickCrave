import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import Home from "../pages/home";
import Orders from "../pages/orders";
import GetMenu from "../pages/getmenu";
import Hotellist from "../pages/hotellist";

async function authorizationuser() {
    const response = await axios.get('http://localhost:80/auth', {
        headers: {
            Authorization: "Bearer " + Cookies.get("accessToken")
        }
    });

    return response.data;
}

export default function PrivateRoute() {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        authorizationuser()
            .then(data => {
                setIsAuthorized(data === "1");
            })
            .catch(error => {
                console.error("Authorization check failed:", error);
                setIsAuthorized(false);
            });
    }, []);

    return (
      isAuthorized ? (
                <BrowserRouter>
                    <Routes>
                        <Route path="home" element={<Home />} />
                        <Route index element={<Home />} />
                        <Route path="getmenu" element={<GetMenu />} />
                        <Route path="order" element={<Orders />} />
                        <Route path="hotellist" element={<Hotellist />} />
                        <Route />
                    </Routes>
                </BrowserRouter>
            ) : (
                <button><a href="/login">Login Now</a></button>
            )
    );
}
