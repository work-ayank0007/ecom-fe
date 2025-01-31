import { Outlet } from "react-router-dom";
import Home from "../pages/Home";
import { logged, setRole } from "../../app/ecom/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Layout() {
    const dispatch = useDispatch();
    function Auth() {
        axios.get(`${import.meta.env.VITE_URL}/auth`, {
            withCredentials: true  // Ensure cookies are sent with the request
        })
        .then(response => {
            if (response.data.success) {
                dispatch(logged(true))
                dispatch(setRole(response?.data?.data?.role))
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
    useEffect(() => {
        Auth();
    }, []);

    return (
        <div className=" relative">
            <Outlet />
            <Home />
        </div>
    );
}
