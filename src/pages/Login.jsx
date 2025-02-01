import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { logged , setRole} from "../../app/ecom/userSlice";
import { useDispatch } from "react-redux";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        pass: ""
    })
    function changeHandler(event) {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value
        })
    }
    async function formHandler(e) {
        e.preventDefault()
        toast.promise(
            axios.post(`${import.meta.env.VITE_URL}/login`, data, { withCredentials: true })
            .then(result => {
                navigate("/");
                const successMessage = result?.data?.message || 'Login successful!';
                dispatch(setRole(result?.data?.role || "guest"))
                dispatch(logged(true));

                return successMessage;
            })
            .catch(err => {
                const errorMessage = err?.response?.data?.message || 'Login Failed!';
                throw new Error(errorMessage);
            }),
        {
            loading: 'Loggin In...',
            success: (message) => <b>{message}</b>,
            error: (err) => <b>{err.message}</b>
        }
        );

    }
    return (
        <div className="w-full h-screen z-50 fixed flex items-center justify-center bg-gradient-to-r from-blue-400/40 via-purple-500/40 to-pink-500/40 backdrop-blur-sm font-poppins">
            <form onSubmit={(e) => formHandler(e)} className="bg-white z-100 p-8 rounded-lg shadow-lg max-w-sm w-full relative">
                <RxCross2 onClick={() => navigate("/")} size={25} className=" absolute right-6 top-6 hover:text-red-600 duration-150 transition-all" />
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

                <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                    <p className="text-lg font-medium">Email</p>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => changeHandler(e)}
                        required
                        className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>

                <label htmlFor="pass" className="block text-sm text-gray-700 mb-4">
                    <p className="text-lg font-medium">Password</p>
                    <input
                        type="password"
                        name="pass"
                        id="pass"
                        value={data.pass}
                        onChange={(e) => changeHandler(e)}
                        required
                        className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-gradient-to-r from-blue-400 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-500 hover:to-blue-400 transition-all duration-150"
                >
                    Submit
                </button>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="text-blue-500 hover:text-blue-700">
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>



    )
}
