const CardsHome = ({ users, albums, products, orders, usersPercentage, albumsPercentage, productsPercentage, ordersPercentage }) => {
    return (
        <>
            <div className="col-xl-3 col-lg-6">
                <div className="card l-bg-blue-dark">
                    <div className="card-statistic-3 p-4">
                        <div className="card-icon card-icon-large"><i className="fas fa-users"></i></div>
                        <div className="mb-4">
                            <h5 className="card-title mb-0">Utenti</h5>
                        </div>
                        <div className="row align-items-center mb-2 d-flex">
                            <div className="col-8">
                                <h2 className="d-flex align-items-center mb-0">
                                    {users.length}
                                </h2>
                            </div>
                            <div className="col-4 text-right">
                                <span>{usersPercentage.toFixed(2)}% <i className="fa fa-arrow-up"></i></span>
                            </div>
                        </div>
                        <div className="progress mt-1 " data-height="8" style={{ height: '8px' }}>
                            <div className="progress-bar l-bg-green" role="progressbar" data-width="25%" aria-valuenow="25"
                                aria-valuemin="0" aria-valuemax="100" style={{ width: '25%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-lg-6">
                <div className="card l-bg-cherry">
                    <div className="card-statistic-3 p-4">
                        <div className="card-icon card-icon-large"><i className="fas fa-images"></i></div>
                        <div className="mb-4">
                            <h5 className="card-title mb-0">Albums</h5>
                        </div>
                        <div className="row align-items-center mb-2 d-flex">
                            <div className="col-8">
                                <h2 className="d-flex align-items-center mb-0">
                                    {albums.length}
                                </h2>
                            </div>
                            <div className="col-4 text-right">
                                <span>{albumsPercentage.toFixed(2)}% <i className="fa fa-arrow-up"></i></span>
                            </div>
                        </div>
                        <div className="progress mt-1 " data-height="8" style={{ height: '8px' }}>
                            <div className="progress-bar l-bg-cyan" role="progressbar" data-width="25%" aria-valuenow="25"
                                aria-valuemin="0" aria-valuemax="100" style={{ width: '25%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-lg-6">
                <div className="card l-bg-green-dark">
                    <div className="card-statistic-3 p-4">
                        <div className="card-icon card-icon-large"><i className="fas fa-tags"></i></div>
                        <div className="mb-4">
                            <h5 className="card-title mb-0">Prodotti</h5>
                        </div>
                        <div className="row align-items-center mb-2 d-flex">
                            <div className="col-8">
                                <h2 className="d-flex align-items-center mb-0">
                                    {products.length}
                                </h2>
                            </div>
                            <div className="col-4 text-right">
                                <span>{productsPercentage.toFixed(2)}% <i className="fa fa-arrow-up"></i></span>
                            </div>
                        </div>
                        <div className="progress mt-1 " data-height="8" style={{ height: '8px' }}>
                            <div className="progress-bar l-bg-orange" role="progressbar" data-width="25%" aria-valuenow="25"
                                aria-valuemin="0" aria-valuemax="100" style={{ width: '25%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-lg-6">
                <div className="card l-bg-orange-dark">
                    <div className="card-statistic-3 p-4">
                        <div className="card-icon card-icon-large"><i className="fas fa-image"></i></div>
                        <div className="mb-4">
                            <h5 className="card-title mb-0">Ordini</h5>
                        </div>
                        <div className="row align-items-center mb-2 d-flex">
                            <div className="col-8">
                                <h2 className="d-flex align-items-center mb-0">
                                    {orders.length}
                                </h2>
                            </div>
                            <div className="col-4 text-right">
                                <span>{ordersPercentage.toFixed(2)}% <i className="fa fa-arrow-up"></i></span>
                            </div>
                        </div>
                        <div className="progress mt-1 " data-height="8" style={{ height: '8px' }}>
                            <div className="progress-bar l-bg-cyan" role="progressbar" data-width="25%" aria-valuenow="25"
                                aria-valuemin="0" aria-valuemax="100" style={{ width: '25%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardsHome