import FrontLayout from "@/Layouts/FrontLayout"
import AlertErrors from "@/components/Front/AlertErrors"
import ProductCard from "@/components/Front/ProductsComponents/ProductCard"
import { useEffect, useState } from "react";

const ProductList = ({ products, flash }) => {
    const [message, setMessage] = useState(flash.message);
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    return (
        <FrontLayout>
            <div className="container my-5">
                <div className="d-flex justify-content-center row">
                    <AlertErrors message={message} />
                    <div className="row products">
                        {products.data.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </FrontLayout>
    )
}

export default ProductList