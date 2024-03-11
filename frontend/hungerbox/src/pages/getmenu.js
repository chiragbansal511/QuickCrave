import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

export default function GetMenu() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState([]);
    const [order, setOrder] = useState([]);
    const location = useLocation();
    const dataReceived = location.state.data;

    function setorder( e , index ) {
        const newOrder = [...order]; // Create a shallow copy
        newOrder.push(e.target.value);
        setOrder(newOrder);
    }

    async function onsubmit() {
        const response = await axios.post(
            'http://localhost:80/order',
            {
                hotelname: dataReceived,
                order : order,
            },
            {
                headers: {
                    Authorization: "Bearer " + Cookies.get("accessToken"),
                },
            }
        );

        Cookies.set("cart" , order);
        console.log(response.data);
        console.log(Cookies.get("cart"))
        // navigate("/order");
    }

    async function gethotellist() {
        const response = await axios.post(
            'http://localhost:80/isopen',
            {
                hotelname: dataReceived,
            },
            {
                headers: {
                    Authorization: "Bearer " + Cookies.get("accessToken"),
                },
            }
        );
        if(response.data == 'closed')
        {
            alert("Hotel is closed now");
            navigate("/hotellist");
            window.location.reload();
        }
        setItems(response.data.menu.menu.items);
        setPrice(response.data.menu.menu.price);
    }

    useEffect(() => {
        gethotellist();
    }, []);


    return (
        <div>
            {
             items.map((e , index)=>(
                <div key={index}>
                     item : {e}
                     <input type="checkbox" value={e} name="checkbox" className={index} onChange={(event) => setorder(event, index)} />
                    <div>price : {price[index]}</div>
                </div>
             ))
            }

            <button onClick={()=>onsubmit()}>Submit</button>
        </div>
    );
}
