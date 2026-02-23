const MetricsCard = ({ label, value, percentage, icon, tone }) => {
  const isPositive = percentage >= 0;

  return (
    <div className="col-xl-3 col-lg-6 col-md-6">
      <div className={`card metric-card metric-card-${tone}`}>
        <div className="metric-head">
          <span className="metric-icon">
            <i className={`fa-solid ${icon}`}></i>
          </span>
          <span className={`metric-trend ${isPositive ? 'up' : 'down'}`}>
            <i className={`fa-solid ${isPositive ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
            {Math.abs(percentage).toFixed(2)}%
          </span>
        </div>
        <div className="metric-body">
          <span className="metric-label">{label}</span>
          <h3>{value}</h3>
        </div>
      </div>
    </div>
  );
};

const CardsHome = ({
  users,
  albums,
  products,
  orders,
  usersPercentage,
  albumsPercentage,
  productsPercentage,
  ordersPercentage,
}) => {
  return (
    <>
      <MetricsCard label="Utenti" value={users.length} percentage={usersPercentage} icon="fa-users" tone="users" />
      <MetricsCard label="Albums" value={albums.length} percentage={albumsPercentage} icon="fa-images" tone="albums" />
      <MetricsCard
        label="Prodotti"
        value={products.length}
        percentage={productsPercentage}
        icon="fa-tags"
        tone="products"
      />
      <MetricsCard label="Ordini" value={orders.length} percentage={ordersPercentage} icon="fa-box" tone="orders" />
    </>
  );
};

export default CardsHome;
