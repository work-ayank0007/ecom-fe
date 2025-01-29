import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
    const [product, setProduct] = useState([]);
    async function fetchProducts() {
        const data = await axios.get(`${import.meta.env.VITE_URL}/product`);
        console.log(data);
    }
    
    useEffect(() => {
        fetchProducts();
    }, [])
    
return (
    <div></div>
)
}
