const CheckoutCustomerCard = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="card mb-4 border shadow-0">
      <div className="p-4 d-flex justify-content-between">
        <div>
          <h5>
            {user.name} {user.lastname}
          </h5>
          <p className="mb-0 text-wrap">Procedi con il tuo ordine</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCustomerCard;
