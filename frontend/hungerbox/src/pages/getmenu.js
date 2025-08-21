import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function GetMenu() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState([]);
    const [order, setOrder] = useState([]); // This will now store the names of selected items
    const location = useLocation();

    // Handle case where state might be missing (e.g., direct navigation)
    const dataReceived = location.state?.data || "Restaurant";

    // Improved logic for handling checkbox changes
    function handleOrderChange(event) {
        const { value, checked } = event.target;
        if (checked) {
            // Add the item to the order array if it's checked
            setOrder(prevOrder => [...prevOrder, value]);
        } else {
            // Remove the item from the order array if it's unchecked
            setOrder(prevOrder => prevOrder.filter(item => item !== value));
        }
    }

    async function onsubmit() {
        if (order.length === 0) {
            alert("Your cart is empty. Please select at least one item.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:80/order',
                { hotelname: dataReceived, order: order },
                { headers: { Authorization: "Bearer " + Cookies.get("accessToken") } }
            );
            console.log("Order submitted:", response.data);
            // On successful order, you can navigate to a "Thank You" or "Orders" page
            navigate("/order"); 
        } catch (error) {
            console.error("Failed to submit order:", error);
            alert("There was an issue submitting your order. Please try again.");
        }
    }

    useEffect(() => {
        async function getMenuList() {
            try {
                const response = await axios.post(
                    'http://localhost:80/isopen',
                    { hotelname: dataReceived },
                    { headers: { Authorization: "Bearer " + Cookies.get("accessToken") } }
                );

                if (response.data === 'closed') {
                    alert("This restaurant is currently closed.");
                    navigate("/hotellist");
                } else {
                    setItems(response.data.menu.menu.items);
                    setPrice(response.data.menu.menu.price);
                }
            } catch (error) {
                console.error("Failed to fetch menu:", error);
                navigate("/hotellist");
            }
        }
        getMenuList();
    }, [dataReceived, navigate]);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-4">
                    <Link to="/home" className="text-2xl font-bold text-indigo-600">Quickcrave</Link>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="container mx-auto px-6 py-12">
                <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                    
                    {/* Left Column: Menu Items */}
                    <div className="lg:col-span-2">
                        <div className="mb-8">
                            <h1 className="text-4xl font-extrabold text-gray-900">{dataReceived}</h1>
                            <p className="mt-2 text-lg text-gray-500">Select items to add to your order.</p>
                        </div>
                        <div className="space-y-4">
                            {items.map((item, index) => (
                                <label key={index} className="flex items-center justify-between bg-white p-5 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">{item}</h2>
                                        <p className="text-md text-gray-600">${price[index] ? price[index] : '0.00'}</p>
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        value={item} 
                                        name="checkbox"
                                        onChange={handleOrderChange} 
                                        className="h-6 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Order Summary (Cart) */}
                    <div className="mt-10 lg:mt-0 lg:col-span-1">
                        <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold border-b pb-4 mb-4">Your Order</h2>
                            {order.length > 0 ? (
                                <ul className="space-y-3 mb-6">
                                    {order.map((orderedItem, index) => (
                                        <li key={index} className="flex justify-between text-gray-700">
                                            <span>{orderedItem}</span>
                                            {/* Price can be shown here if you store more item details */}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 mb-6">Your cart is empty.</p>
                            )}
                            <button 
                                onClick={onsubmit}
                                className="w-full px-6 py-3 text-md font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                                disabled={order.length === 0}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}