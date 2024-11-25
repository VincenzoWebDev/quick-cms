import Layout from "@/Layouts/Admin/Layout";
import AlertErrors from '@/components/Admin/AlertErrors';
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import CardsHome from "@/components/Admin/CardsHome";
import { STORAGE_URL } from "@/constants/constants";
Chart.register(...registerables);

const Home = (props) => {
    const { users, albums, products, orders, dataChart, user_auth, flash } = props;
    const { usersPercentage, albumsPercentage, productsPercentage, ordersPercentage } = props;
    const [message, setMessage] = useState(flash.message);
    const [status, setStatus] = useState(flash.status);
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [status]);

    const options = {
        scales: {
            x: {
                type: 'category',
                ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0
                }
            },
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const prepareLineChartData = () => {
        const labels = dataChart.map(entry => getMonthName(entry.month));
        const userCounts = dataChart.map(entry => entry.userCount);
        const albumCounts = dataChart.map(entry => entry.albumCount);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Utenti',
                    data: userCounts,
                    fill: false,
                    borderColor: 'rgb(66, 134, 244)',
                    tension: 0.1
                },
                {
                    label: 'Album',
                    data: albumCounts,
                    fill: false,
                    borderColor: 'rgb(255, 0, 153)',
                    tension: 0.1
                },
            ]
        };
    };

    const getMonthName = (month) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthNames[month - 1];
    };

    const prepareBarChartData = () => {
        const labels = dataChart.map(entry => getMonthName(entry.month));
        const productCounts = dataChart.map(entry => entry.productCount);
        const orderCounts = dataChart.map(entry => entry.orderCount);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Prodotti',
                    data: productCounts,
                    fill: false,
                    backgroundColor: 'rgb(56, 239, 125)',
                    tension: 0.1
                },
                {
                    label: 'Ordini',
                    data: orderCounts,
                    fill: false,
                    backgroundColor: 'rgb(255, 186, 86)',
                    tension: 0.1
                },
            ]
        };
    }

    return (
        <Layout user_auth={user_auth}>
            <div className="row">
                <AlertErrors message={message} status={status} />
                <CardsHome users={users} albums={albums} products={products} orders={orders}
                    usersPercentage={usersPercentage} albumsPercentage={albumsPercentage} productsPercentage={productsPercentage} ordersPercentage={ordersPercentage} />
            </div>

            <div className="row">
                <div className='col-lg-6 col-md-12'>
                    <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                        <div className="card-body">
                            <div className="bg-white p-3">
                                <Line data={prepareLineChartData()} options={options} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6 col-md-12'>
                    <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                        <div className="card-body">
                            <div className="bg-white p-3">
                                <Bar data={prepareBarChartData()} options={options} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className='col-lg-12 col-md-12'>
                    <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                        <div className="card-body">
                            <div className="table-responsive">
                                <h5 className='text-center'>Ultimi 10 utenti registrati</h5>
                                <table className="table table-hover mb-0 p-1">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">#</th>
                                            <th scope="col">Utente</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Creato il</th>
                                            <th scope="col">Aggiornato il</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.slice(0, 10).map((user) => {
                                                return (
                                                    <tr key={user.id}>
                                                        <th className='col-2 text-center'>{user.id}</th>
                                                        <td className='col-3'>
                                                            <img src={STORAGE_URL + user.profile_img} alt={user.name} title={user.name}
                                                                className="img-fluid rounded-circle object-fit-cover me-3"
                                                                style={{ width: '40px', height: '40px', border: '1px solid #ff0000' }}
                                                            />
                                                            {user.name}&nbsp;{user.lastname}
                                                        </td>
                                                        <td className='col-3'>{user.email}</td>
                                                        <td className='col-2'>{new Date(user.created_at).toLocaleDateString()}</td>
                                                        <td className='col-2'>{new Date(user.updated_at).toLocaleDateString()}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
