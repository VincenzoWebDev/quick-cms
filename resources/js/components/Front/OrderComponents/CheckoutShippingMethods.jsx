const CheckoutShippingMethods = ({ shippingMethods, selectedId, onChange }) => {
  return (
    <div className="row mb-3">
      {shippingMethods.map((shipping) => (
        <div className="col-lg-4 mb-3" key={shipping.id}>
          <div className="form-check h-100 border rounded-3">
            <div className="p-3">
              <input
                className="form-check-input"
                type="radio"
                name="shipping_method_id"
                id={`shippingMethod${shipping.id}`}
                checked={String(selectedId) === String(shipping.id)}
                onChange={() => onChange(shipping.id)}
              />
              <label className="form-check-label" htmlFor={`shippingMethod${shipping.id}`}>
                {shipping.name} <br />
                <small className="text-muted">{shipping.description}</small>
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutShippingMethods;
