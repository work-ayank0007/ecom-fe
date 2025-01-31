import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logged , setRole} from "../../app/ecom/userSlice";
import toast from "react-hot-toast";

export default function Navbar() {
    const role = useSelector((state) => state.user.role);
    const loggedIn = useSelector((state) => state.user.loggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Logout function
    const handleLogout = async () => {
        try {
            // Make the API call to logout and clear the cookie
            await axios.post(`${import.meta.env.VITE_URL}/logout`, {}, { withCredentials: true });

            // Update Redux state to logged out
            dispatch(logged(false));
            dispatch(setRole("guest"))
            // Display a success toast
            toast.success("Logged out successfully!");

            // Redirect to homepage
            navigate('/');
        } catch (error) {
            console.error("Logout failed", error);
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <div className="w-full bg-gradient-to-r from-blue-400/40 via-purple-500/40 to-pink-500/40 backdrop-blur-sm shadow-lg">
            <nav className="mx-auto w-10/12 max-w-7xl flex justify-between items-center py-4">
                <h1 className="text-2xl font-semibold text-white">
                    <Link to="/">BLUEKART</Link>
                </h1>
                <span className="flex items-center gap-x-4">
                    {/* Not logged in */}
                    {!loggedIn && (
                        <ul className="flex gap-6 text-white">
                            <li>
                                <Link to="/login" className="hover:text-blue-300 transition duration-300">Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className="hover:text-blue-300 transition duration-300">Register</Link>
                            </li>
                        </ul>
                    )}

                    {/* If logged in, show role-based navigation */}
                    {role?.toLowerCase() === 'admin' && (
                        <ul className="flex gap-6 text-white">
                            <li>
                                <Link to="/admin" className="hover:text-blue-300 transition duration-300">Admin</Link>
                            </li>
                        </ul>
                    )}

                    {role?.toLowerCase() === 'user' && (
                        <ul className="flex gap-6 text-white">
                            <li>
                                <Link to="/cart" className="hover:text-blue-300 transition duration-300">Cart</Link>
                            </li>
                        </ul>
                    )}

                    {/* Logout button */}
                    {loggedIn && (
                        <button
                            onClick={handleLogout}
                            className="text-white bg-red-500 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Logout
                        </button>
                    )}
                </span>
            </nav>
        </div>
    );
}
