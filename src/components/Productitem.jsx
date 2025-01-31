import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../app/ecom/productSlice";

export const Productitem = (product) => {
    const role = useSelector(state=>state.user.role);
    const { description, id, img, price, title } = product.product;
    const [flag, setFlag] = useState(false);
    const dispatch = useDispatch();
    const shortDesc = description.substring(0, 100);

    async function deleteProduct() {
        toast.promise(
            axios.delete(`${import.meta.env.VITE_URL}/delete/${id}`, { withCredentials: true })
                .then(result => {
                    dispatch(fetchProduct());
                    const successMessage = result?.data?.message;
                    return successMessage;
                })
                .catch(err => {
                    const errorMessage = err?.response?.data?.message;
                    throw new Error(errorMessage);
                }),
            {
                loading: 'Processing...',
                success: (message) => <b>{message}</b>,
                error: (err) => <b>{err.message}</b>
            }
        );
    }

    return (
        <div className="relative bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition-all duration-200">
            {   role==='admin' &&
                <MdDeleteOutline
                    onClick={deleteProduct}
                    className="absolute top-2 right-2 text-xl text-red-600 cursor-pointer hover:text-red-800 transition-all"
                />
            }
            <img
                src={img}
                alt={id + ` img`}
                className="w-full h-56 object-contain mx-auto rounded-md mb-4"
            />
            <div className="text-center">
                <span className="block text-lg font-semibold text-gray-800 mb-2">{title}</span>
                <p className="text-sm text-gray-600 mb-4">
                    {flag ? (description) : (shortDesc + '...')}
                    <button
                        onClick={() => setFlag(!flag)}
                        aria-label={flag ? "Show less description" : "Show more description"}
                        className="text-blue-500 hover:text-blue-700 text-sm ml-2"
                    >
                        {flag ? "Show less" : "Show more"}
                    </button>
                </p>
                <span className="text-xl font-bold text-blue-600">${price}</span>
            </div>
        </div>
    );
};
