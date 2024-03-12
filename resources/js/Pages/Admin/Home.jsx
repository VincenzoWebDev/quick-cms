import Layout from "@/Layouts/Admin/Layout";
import AlertErrors from '@/components/Admin/AlertErrors';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import CardsHome from "@/components/Admin/CardsHome";
Chart.register(...registerables);

const Home = (props) => {
    const { users, albums, photos, albumCategories, dataChart, user_auth, flash } = props;
    const { usersPercentage, albumsPercentage, categoriesPercentage, photosPercentage } = props;
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
                beginAtZero: false
            }
        }
    };

    const prepareChartData = () => {
        const labels = dataChart.map(entry => getMonthName(entry.month));
        const userCounts = dataChart.map(entry => entry.userCount);
        const albumCounts = dataChart.map(entry => entry.albumCount);
        const categoriesCounts = dataChart.map(entry => entry.categoryCount);
        const photosCounts = dataChart.map(entry => entry.photoCount);

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
                {
                    label: 'Categorie',
                    data: categoriesCounts,
                    fill: false,
                    borderColor: 'rgb(56, 239, 125)',
                    tension: 0.1
                },
                {
                    label: 'Foto',
                    data: photosCounts,
                    fill: false,
                    borderColor: 'rgb(255, 186, 86)',
                    tension: 0.1
                }
            ]
        };
    };

    const getMonthName = (month) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthNames[month - 1];
    };

    return (
        <Layout user_auth={user_auth}>
            <div className="row">
                <AlertErrors message={message} status={status} />
                <CardsHome users={users} albums={albums} photos={photos} albumCategories={albumCategories}
                    usersPercentage={usersPercentage} albumsPercentage={albumsPercentage} categoriesPercentage={categoriesPercentage} photosPercentage={photosPercentage} />
            </div>

            <div className="row">
                <div className='col-lg-6 col-md-12'>
                    <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                        <div className="card-body">
                            <div className="bg-white p-3">
                                <Line data={prepareChartData()} options={options} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6 col-md-12'>
                    <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                        <div className="card-body">
                            <div className="table-responsive">
                                <h4 className='text-center'>Ultimi 10 utenti registrati</h4>
                                <table className="table table-hover mb-0 p-1">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.slice(0, 10).map((user) => {
                                                return (
                                                    <tr key={user.id}>
                                                        <th className='col-md-1 text-center'>{user.id}</th>
                                                        <td className='col-md-2'>{user.name}</td>
                                                        <td className='col-md-2'>{user.email}</td>
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
