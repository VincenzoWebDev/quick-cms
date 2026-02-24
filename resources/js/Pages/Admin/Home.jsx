import Layout from '@/Layouts/Admin/Layout';
import { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import CardsHome from '@/components/Admin/CardsHome';
import { STORAGE_URL } from '@/constants/constants';
import { toast } from 'react-toastify';
import { Link } from '@inertiajs/react';

Chart.register(...registerables);

const Home = (props) => {
  const { users, albums, products, orders, dataChart, user_auth, flash } = props;
  const { usersPercentage, albumsPercentage, productsPercentage, ordersPercentage } = props;
  const [message] = useState(flash.message);
  const totalEntities = users.length + albums.length + products.length + orders.length;
  const orderToProductRatio = products.length > 0 ? ((orders.length / products.length) * 100).toFixed(1) : '0.0';

  useEffect(() => {
    if (message && message.tipo === 'success') {
      toast.success(message.testo);
    } else if (message && message.tipo === 'danger') {
      toast.error(message.testo);
    }
  }, [message]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const getMonthName = (month) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[month - 1];
  };

  const prepareLineChartData = () => {
    const labels = dataChart.map((entry) => getMonthName(entry.month));

    return {
      labels,
      datasets: [
        {
          label: 'Utenti',
          data: dataChart.map((entry) => entry.userCount),
          fill: true,
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.14)',
          tension: 0.35,
        },
        {
          label: 'Album',
          data: dataChart.map((entry) => entry.albumCount),
          fill: true,
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14, 165, 233, 0.14)',
          tension: 0.35,
        },
      ],
    };
  };

  const prepareBarChartData = () => {
    const labels = dataChart.map((entry) => getMonthName(entry.month));

    return {
      labels,
      datasets: [
        {
          label: 'Prodotti',
          data: dataChart.map((entry) => entry.productCount),
          backgroundColor: '#22c55e',
          borderRadius: 8,
        },
        {
          label: 'Ordini',
          data: dataChart.map((entry) => entry.orderCount),
          backgroundColor: '#f59e0b',
          borderRadius: 8,
        },
      ],
    };
  };

  const prepareMixChartData = () => ({
    labels: ['Utenti', 'Album', 'Prodotti', 'Ordini'],
    datasets: [
      {
        data: [users.length, albums.length, products.length, orders.length],
        backgroundColor: ['#2563eb', '#7c3aed', '#059669', '#ea580c'],
        borderColor: 'transparent',
      },
    ],
  });

  return (
    <Layout user_auth={user_auth}>
      <section className="page-hero dashboard-hero mb-4">
        <div className="dashboard-hero-grid">
          <div className="dashboard-hero-main">
            <span className="dashboard-hero-kicker">Dashboard overview</span>
            <h2>Benvenuto, {user_auth?.name || 'Admin'}</h2>
            <p>Controllo rapido su performance contenuti, catalogo e ordini in un'unica vista operativa.</p>
            <div className="dashboard-hero-actions">
              <Link href={route('users.index')} className="btn cb-primary">
                <i className="fa-solid fa-users me-2"></i>
                Gestisci utenti
              </Link>
              <Link href={route('files')} className="btn btn-outline-secondary">
                <i className="fa-solid fa-folder-open me-2"></i>
                Apri files
              </Link>
            </div>
          </div>

          <div className="dashboard-hero-meta">
            <div className="dashboard-hero-stat">
              <small>Record gestiti</small>
              <strong>{totalEntities}</strong>
            </div>
            <div className="dashboard-hero-stat">
              <small>Ordini/Prodotti</small>
              <strong>{orderToProductRatio}%</strong>
            </div>
            <div className="dashboard-hero-stat">
              <small>Utenti recenti</small>
              <strong>{users.slice(0, 10).length}</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="row g-3 mb-4">
        <CardsHome
          users={users}
          albums={albums}
          products={products}
          orders={orders}
          usersPercentage={usersPercentage}
          albumsPercentage={albumsPercentage}
          productsPercentage={productsPercentage}
          ordersPercentage={ordersPercentage}
        />
      </div>

      <div className="row g-4 mb-4">
        <div className="col-xl-8 col-lg-7 col-md-12">
          <div className="card panel-card h-100">
            <div className="card-body">
              <div className="panel-head">
                <h5>Crescita contenuti</h5>
                <small>Andamento utenti e album negli ultimi mesi</small>
              </div>
              <div className="chart-box">
                <Line data={prepareLineChartData()} options={options} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-5 col-md-12">
          <div className="card panel-card h-100 dashboard-mix-card">
            <div className="card-body">
              <div className="panel-head mb-2">
                <h5>Distribuzione risorse</h5>
                <small>Peso attuale tra aree principali</small>
              </div>
              <div className="dashboard-doughnut-box">
                <Doughnut data={prepareMixChartData()} options={doughnutOptions} />
              </div>
              <div className="dashboard-mix-legend">
                <span className="legend-item legend-users">
                  <i className="fa-solid fa-circle"></i> Utenti: {users.length}
                </span>
                <span className="legend-item legend-albums">
                  <i className="fa-solid fa-circle"></i> Album: {albums.length}
                </span>
                <span className="legend-item legend-products">
                  <i className="fa-solid fa-circle"></i> Prodotti: {products.length}
                </span>
                <span className="legend-item legend-orders">
                  <i className="fa-solid fa-circle"></i> Ordini: {orders.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="card panel-card h-100">
            <div className="card-body">
              <div className="panel-head">
                <h5>Trend e-commerce</h5>
                <small>Prodotti e ordini per mese</small>
              </div>
              <div className="chart-box">
                <Bar data={prepareBarChartData()} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card panel-card">
        <div className="card-body">
          <div className="panel-head mb-3">
            <h5>Ultimi 10 utenti registrati</h5>
            <small>Monitoraggio rapido dei nuovi accessi</small>
          </div>

          <div className="admin-list-toolbar">
            <p className="mb-0">Snapshot rapido degli ultimi utenti iscritti, con dati essenziali di contatto e data.</p>
          </div>

          <div className="table-responsive admin-table-shell">
            <table className="table table-hover mb-0 admin-table dashboard-users-table">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    #
                  </th>
                  <th scope="col">Utente</th>
                  <th scope="col">Email</th>
                  <th scope="col">Creato il</th>
                  <th scope="col">Aggiornato il</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 10).map((user) => (
                  <tr key={user.id}>
                    <th className="text-center">{user.id}</th>
                    <td>
                      <div className="table-user-cell">
                        <img
                          src={STORAGE_URL + user.profile_img}
                          alt={user.name}
                          title={user.name}
                          className="img-fluid rounded-circle object-fit-cover"
                        />
                        <span>
                          {user.name} {user.lastname}
                        </span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td>{new Date(user.updated_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
