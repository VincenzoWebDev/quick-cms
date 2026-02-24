import React from 'react';
import { Link } from '@inertiajs/react';
import { STORAGE_URL } from '@/constants/constants';
import { ButtonDelete, ButtonEdit } from '@/components/Admin/Index';

const ProductRow = React.memo(({ product, handleCheckboxChange, selectedRecords, handleDelete }) => {
  const stockValue = Number(product.stock);
  const stockBadgeClass = stockValue <= 0 ? 'is-out' : stockValue <= 5 ? 'is-low' : 'is-ok';

  return (
    <tr key={product.id} className="align-middle">
      <th scope="row" className="col-md-1">
        <div className="form-check d-flex justify-content-center align-items-center">
          <input
            className="form-check-input"
            type="checkbox"
            value={product.id}
            onChange={(e) => handleCheckboxChange(e, product.id)}
            checked={selectedRecords.includes(product.id)}
          />
        </div>
      </th>
      <th scope="row" className="col-md-1">
        #{product.id}
      </th>
      <td scope="row" className="col-md-3">
        <div className="products-name-cell">
          <img
            src={STORAGE_URL + product.image_path}
            alt="product"
            width={58}
            height={58}
            className="object-fit-cover products-thumb"
            key={product.id}
            loading="lazy"
          />
          <div className="products-name-meta">
            <strong>{product.name}</strong>
            <small>{product.categories.map((category) => category.name).join(', ') || 'Nessuna categoria'}</small>
          </div>
        </div>
      </td>
      <td scope="row" className="col-md-1">
        <span className="products-price-pill">EUR {product.price}</span>
      </td>
      <td scope="row" className="col-md-1">
        <span className={`products-stock-badge ${stockBadgeClass}`}>{stockValue}</span>
      </td>
      <td scope="row" className="col-md-2">
        <span className="products-categories-text">{product.categories.map((category) => category.name).join(', ')}</span>
      </td>
      <td scope="row" className="text-center col-md-2">
        <div className="action-buttons">
          <Link href={route('products.edit', product.id)} className="action-icon-link">
            <ButtonEdit />
          </Link>
          <form onSubmit={handleDelete} className="d-inline" id={product.id}>
            <ButtonDelete />
          </form>
        </div>
      </td>
    </tr>
  );
});
export default ProductRow;
