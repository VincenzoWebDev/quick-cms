import React from "react";
import { Link } from "@inertiajs/react";
import { BASE_URL, STORAGE_URL } from "@/constants/constants";
import { ButtonDelete, ButtonEdit } from "@/components/Admin/Index";

const ProductRow = React.memo(({ product, handleCheckboxChange, selectedRecords, handleDelete }) => {
    return (
        <tr key={product.id} className="align-middle">
            <th scope="row" className='col-md-1'>
                <div className="form-check d-flex justify-content-center align-items-center">
                    <input className="form-check-input" type="checkbox" value={product.id}
                        onChange={(e) => handleCheckboxChange(e, product.id)}
                        checked={selectedRecords.includes(product.id)} />
                </div>
            </th>
            <th scope="row" className='col-md-1'>{product.id}</th>
            <td scope="row" className='col-md-2'>
                <img src={STORAGE_URL + product.image_path} alt="product" width={60} key={product.id} loading="lazy" />
            </td>
            <td scope="row" className='col-md-2'>{product.name}</td>
            <td scope="row" className='col-md-1'>{product.price}</td>
            <td scope="row" className='col-md-1'>{product.stock}</td>
            <td scope="row" className='col-md-1'>{product.categories.map(category => category.name).join(', ')}</td>
            <td scope="row" className="text-center col-md-3">
                <Link href={route('products.edit', product.id)} className="btn px-2">
                    <ButtonEdit url={BASE_URL} />
                </Link>
                <form onSubmit={handleDelete} className="d-inline" id={product.id}>
                    <ButtonDelete url={BASE_URL} />
                </form>
            </td>
        </tr>
    )
});
export default ProductRow;