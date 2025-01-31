import { useEffect } from "react";
import { Productitem } from "../components/Productitem";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../app/ecom/productSlice";

export default function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    return (
        <div className="py-8 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto w-full max-w-screen-xl">
                {products.map((product, index) => (
                    <Productitem key={index} product={product} />
                ))}
            </div>
        </div>
    );
}
