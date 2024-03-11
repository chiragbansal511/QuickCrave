import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export default function Hotellist() {
    const [hotellist, setHotellist] = useState([]);
    const navigate = useNavigate();

    async function gethotellist() {
        const response = await axios.get(
            'http://localhost:80/hotellist',
            {
                headers: {
                    Authorization: "Bearer " + Cookies.get("accessToken"),
                },
            }
        );
        setHotellist(response.data);
        console.log(hotellist)

    }

    function handlesubmit(hotelname) {
    
            navigate('/getmenu', { state: { data: hotelname } });
    }

    useEffect(() => {
        gethotellist();
    }, []);

    return (
        <div>
            {
                hotellist.map((e, index) => (
                    <div key={index}>
                        <button onClick={()=>handlesubmit(e.hotelname)}>{e.hotelname}</button>
                    </div>
                ))

            }
        </div>
    );
}