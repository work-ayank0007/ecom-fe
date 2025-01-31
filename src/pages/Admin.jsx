import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

export default function AddProductForm() {
    const navigate = useNavigate();

    // Initial state for the form fields
    const [data, setData] = useState({
        title: "",
        price: "",
        description: "",
        img: ""
    });

    // Change handler to update state based on input values
    function changeHandler(event) {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value
        });
    }

    // Form submission handler
    async function formHandler(e) {
        e.preventDefault();

        toast.promise(
            axios.post(`${import.meta.env.VITE_URL}/add`, data, { withCredentials: true })
                .then(result => {
                    const successMessage = result?.data?.message || "Product added to cart!";
                    navigate("/");  // Optionally, redirect to the cart page or other pages after successful submission
                    return successMessage;
                })
                .catch(err => {
                    const errorMessage = err?.response?.data?.message || "Failed to add product to cart!";
                    throw new Error(errorMessage);
                }),
            {
                loading: 'Adding product...',
                success: (message) => <b>{message}</b>,
                error: (err) => <b>{err.message}</b>
            });
    }

    return (
        <div className="w-full h-full absolute flex items-center justify-center bg-gradient-to-r from-blue-400/40 via-purple-500/40 to-pink-500/40 backdrop-blur-sm font-poppins">
            <form onSubmit={(e) => formHandler(e)} className="absolute bg-white z-100 p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add Product to Cart</h2>
                <RxCross2 onClick={() => navigate("/")} size={25} className="absolute right-6 top-6 hover:text-red-600 duration-150 transition-all" />

                <label htmlFor="title" className="block text-sm text-gray-700 mb-2">
                    <p className="text-lg font-medium">Product Title</p>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={data.title}
                        onChange={(e) => changeHandler(e)}
                        required
                        className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>

                <label htmlFor="price" className="block text-sm text-gray-700 mb-2">
                    <p className="text-lg font-medium">Price</p>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={data.price}
                        onChange={(e) => changeHandler(e)}
                        required
                        className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>

                <label htmlFor="description" className="block text-sm text-gray-700 mb-2">
                    <p className="text-lg font-medium">Description</p>
                    <textarea
                        name="description"
                        id="description"
                        value={data.description}
                        onChange={(e) => changeHandler(e)}
                        required
                        className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>

                <label htmlFor="img" className="block text-sm text-gray-700 mb-4">
                    <p className="text-lg font-medium">Image URL</p>
                    <input
                        type="text"
                        name="img"
                        id="img"
                        value={data.img}
                        onChange={(e) => changeHandler(e)}
                        required
                        className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-gradient-to-r from-blue-400 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-500 hover:to-blue-400 transition-all duration-150"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}
