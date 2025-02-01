import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { AddToCart, RemoveFromCart, setCart } from "../../app/ecom/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const dispatch = useDispatch();
    const { cart, role } = useSelector((state) => state.user);
    const [totalPrice, setTotalPrice] = useState(0);
    const history = useNavigate();

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total.toFixed(2));
    }, [cart]);

    const deleteProduct = async (id) => {
        toast.promise(
            axios.delete(`${import.meta.env.VITE_URL}/cart/${id}`, { withCredentials: true })
                .then((response) => {
                    dispatch(setCart(response.data.data));
                })
                .catch((err) => {
                    throw new Error(err?.response?.data?.message || "Failed to delete product");
                }),
            {
                loading: 'Deleting...',
                success: () => <b>Product deleted successfully!</b>,
                error: (err) => <b>{err.message}</b>
            }
        );
    };

    const handleCheckout = () => {
        toast.success("Order placed successfully!");
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center">Your Cart</h2>
            {cart.length > 0 ? (
                <div>
                    {cart.map((product) => (
                        <div key={product.id} className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200">
                            <div className="flex items-center">
                                <img src={product.img} alt={product.title} className="w-20 h-20 object-cover rounded-md mr-4" />
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">{product.title}</p>
                                    <p className="text-sm text-gray-600">{product.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button onClick={() => dispatch(RemoveFromCart(product.id))} className="text-blue-600 hover:text-blue-800 p-2">
                                    <FaMinus />
                                </button>
                                <span className="mx-4 text-xl">{product.quantity}</span>
                                <button onClick={() => dispatch(AddToCart(product.id))} className="text-blue-600 hover:text-blue-800 p-2">
                                    <FaPlus />
                                </button>
                            </div>
                            <div className="flex items-center">
                                <span className="text-lg font-bold text-blue-600">${(product.price * product.quantity).toFixed(2)}</span>
                                {role === 'admin' && (
                                    <MdDeleteOutline
                                        onClick={() => deleteProduct(product.id)}
                                        className="ml-4 text-red-600 cursor-pointer hover:text-red-800"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4 border border-gray-200 mt-6">
                        <p className="text-xl font-semibold text-gray-800">Total Price</p>
                        <span className="text-2xl font-bold text-blue-600">${totalPrice}</span>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleCheckout}
                            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-lg text-gray-600">Your cart is empty</p>
                    <button
                        onClick={() => history.push('/')}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200"
                    >
                        Go to Home
                    </button>
                </div>
            )}
        </div>
    );
}
