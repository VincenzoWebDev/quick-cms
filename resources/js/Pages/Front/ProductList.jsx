import FrontLayout from "@/Layouts/FrontLayout"
import ProductCard from "@/components/Front/ProductsComponents/ProductCard"

const ProductList = ({ products, pages }) => {

    return (
        <FrontLayout pages={pages}>
            <div className="container mb-5">
                <div className="d-flex justify-content-center row">
                    <div className="col-md-10 products">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </FrontLayout>
    )
}

export default ProductList