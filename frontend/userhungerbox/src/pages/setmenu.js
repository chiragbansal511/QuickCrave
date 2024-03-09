import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function SetMenu() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState([]);
    const [count, setCount] = useState(1);

    function setitems(index, e) {
        const newItems = [...items]; // Create a shallow copy
        newItems[index] = e.target.value;
        setItems(newItems);
    }

    function setprice(index, e) {
        const newPrices = [...price]; // Create a shallow copy
        newPrices[index] = e.target.value;
        setPrice(newPrices);
    }

    async function onsubmit() {
        const response = await axios.post(
            'http://localhost:80/openhotel',
            {
                menu: {
                    items: items,
                    price: price
                }
            },
            {
                headers: {
                    Authorization: "Bearer " + Cookies.get("accessToken"),
                },
            }
        );

        console.log(response.data);
        navigate("/order");
    }

    return (
        <div>
            {Array.from({ length: count }, (_, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Item"
                        value={items[index] || ''}
                        onChange={(e) => setitems(index, e)}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        value={price[index] || ''}
                        onChange={(e) => setprice(index, e)}
                    />
                </div>
            ))}
            <button onClick={() => setCount(currentCount => currentCount + 1)}>Add</button>
            <button onClick={() => { onsubmit() }}>Submit</button>
        </div>
    );
}
