import Layout from '@/Layouts/Admin/Layout';
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import CardsHome from '@/components/Admin/CardsHome';
import { STORAGE_URL } from '@/constants/constants';
import { toast } from 'react-toastify';

Chart.register(...registerables);

const Home = (props) => {
  const { users, albums, products, orders, dataChart, user_auth, flash } = props;
  const { usersPercentage, albumsPercentage, productsPercentage, ordersPercentage } = props;
  const [message] = useState(flash.message);

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

  return (
    <Layout user_auth={user_auth}>
      <section className="page-hero mb-4">
        <div className="page-hero-content">
          <h2>Panoramica operativa</h2>
          <p>Una vista compatta dei trend recenti per utenti, contenuti e shop.</p>
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
        <div className="col-lg-6 col-md-12">
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

        <div className="col-lg-6 col-md-12">
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

          <div className="table-responsive admin-table-shell">
            <table className="table table-hover mb-0 admin-table">
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
