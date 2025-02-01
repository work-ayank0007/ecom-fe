import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import { BsCartPlus, BsCartX } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../app/ecom/productSlice";
import { AddToCart, RemoveFromCart } from "../../app/ecom/userSlice";
import { useNavigate } from "react-router-dom";

export const Productitem = ({ product }) => {
    const { role, cart, loggedIn } = useSelector((state) => state.user);
    const { description, id, img, price, title } = product;
    const [flag, setFlag] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const shortDesc = description.substring(0, 100);

    function inCart(id) {
        return cart.some((ele) => ele.id === id); // Use strict equality
    }

    async function deleteProduct() {
        toast.promise(
            axios
                .delete(`${import.meta.env.VITE_URL}/delete/${id}`, { withCredentials: true })
                .then((result) => {
                    dispatch(fetchProduct());
                    const successMessage = result?.data?.message;
                    return successMessage;
                })
                .catch((err) => {
                    const errorMessage = err?.response?.data?.message || "An error occurred"; 
                    throw new Error(errorMessage);
                }),
            {
                loading: "Processing...",
                success: (message) => <b>{message}</b>,
                error: (err) => <b>{err.message}</b>,
            }
        );
    }

    const toggleCart = (id) => {
        if (!loggedIn) {
            toast.error("Please login first");
            setTimeout(() => navigate("/login"), 500); 
            return;
        }
        if (inCart(id)) {
            dispatch(RemoveFromCart(id));
        } else {
            dispatch(AddToCart(id));
        }
    };
    

    return (
        <div className="relative bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition-all duration-200 flex flex-col justify-between">
            {role === "admin" && (
                <MdDeleteOutline
                    onClick={deleteProduct}
                    className="absolute top-2 right-2 text-xl text-red-600 cursor-pointer hover:text-red-800 transition-all"
                />
            )}
            <img
                src={img}
                alt={id + ` img`}
                className="w-full h-56 object-contain mx-auto rounded-md mb-4"
            />
            <div>
                <span className="block text-lg font-semibold text-gray-800 mb-2">{title}</span>
                <p className="text-sm text-gray-600 mb-4">
                    {flag ? description : shortDesc + "..."}
                    <button
                        onClick={() => setFlag(!flag)}
                        aria-label={flag ? "Show less description" : "Show more description"}
                        className="text-blue-500 hover:text-blue-700 text-sm ml-2"
                    >
                        {flag ? "Show less" : "Show more"}
                    </button>
                </p>
                {
                    (role === "user" || role === "guest") && (
                        <p className="flex justify-between items-center">
                            <span className="text-xl font-bold text-blue-600">${price}</span>
                            {inCart(product.id) ? (
                                <BsCartX className="text-red-300 hover:text-red-600 transition-all duration-100" size={20} onClick={() => toggleCart(product.id)} />
                            ) : (
                                <BsCartPlus className="text-green-300 hover:text-green-600 transition-all duration-100" size={20} onClick={() => toggleCart(product.id)} />
                            )}
                        </p>
                    )
                }

            </div>
        </div>
    );
};
