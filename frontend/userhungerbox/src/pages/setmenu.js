import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

// A simple Trash Can icon for the remove button
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export default function SetMenu() {
    const navigate = useNavigate();
    // Use an array of objects for better state management
    const [menuItems, setMenuItems] = useState([{ item: '', price: '' }]);

    // Function to handle changes in any input field
    const handleInputChange = (index, event) => {
        const values = [...menuItems];
        values[index][event.target.name] = event.target.value;
        setMenuItems(values);
    };

    // Function to add a new item/price field pair
    const addItemField = () => {
        setMenuItems([...menuItems, { item: '', price: '' }]);
    };

    // Function to remove an item/price field pair
    const removeItemField = (index) => {
        const values = [...menuItems];
        values.splice(index, 1);
        setMenuItems(values);
    };

    async function onsubmit() {
        // Filter out any empty items before submitting
        const finalMenu = menuItems.filter(menu => menu.item.trim() !== '' && menu.price.toString().trim() !== '');
        if (finalMenu.length === 0) {
            alert("Please add at least one valid menu item.");
            return;
        }

        const items = finalMenu.map(menu => menu.item);
        const prices = finalMenu.map(menu => parseFloat(menu.price));

        try {
            const response = await axios.post(
                'http://localhost:80/openhotel',
                { menu: { items, price: prices } },
                { headers: { Authorization: "Bearer " + Cookies.get("accessToken") } }
            );
            console.log("Menu submitted successfully:", response.data);
            navigate("/home"); // Navigate back to the admin home after success
        } catch (error) {
            console.error("Failed to submit menu:", error);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Admin Navigation */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-4">
                    <Link to="/home" className="text-xl font-bold text-gray-800">Admin Dashboard</Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900">Set Your Menu</h1>
                        <p className="mt-2 text-lg text-gray-600">Add or remove items and set their prices.</p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
                        {menuItems.map((menuItem, index) => (
                            <div key={index} className="flex items-center gap-4">
                                {/* Item Name Input */}
                                <div className="flex-grow">
                                    <label className="block text-sm font-medium text-gray-700">Item Name</label>
                                    <input
                                        type="text"
                                        name="item"
                                        placeholder="e.g., Pizza"
                                        value={menuItem.item}
                                        onChange={(e) => handleInputChange(index, e)}
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                {/* Price Input */}
                                <div className="w-32">
                                    <label className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="e.g., 12.99"
                                        min="0"
                                        step="0.01"
                                        value={menuItem.price}
                                        onChange={(e) => handleInputChange(index, e)}
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                {/* Remove Button */}
                                <button
                                    onClick={() => removeItemField(index)}
                                    className="p-2 mt-6 text-red-500 bg-red-100 rounded-full hover:bg-red-200 disabled:opacity-50"
                                    disabled={menuItems.length === 1} // Disable removing when only one item is left
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        ))}
                        
                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-4 border-t">
                            <button
                                onClick={addItemField}
                                className="px-5 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200"
                            >
                                Add Another Item
                            </button>
                            <button
                                onClick={onsubmit}
                                className="px-6 py-2 text-md font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                            >
                                Submit Menu
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}