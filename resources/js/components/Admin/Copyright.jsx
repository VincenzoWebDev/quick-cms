import { useState } from 'react';

const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    return `${year}`;
}

const Copyright = () => {
    const [currentDate, setCurrentDate] = useState(getDate());


    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <nav className="d-flex">
                            <ul className="m-0 p-0">
                                <li>
                                    <a href="#">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Company
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Portfolio
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </nav>

                    </div>
                    <div className="col-md-6">
                        <p className="copyright d-flex justify-content-end"> &copy; {currentDate} Design & Develop by
                            <a href="https://www.instagram.com/vincenzo.web.dev/" target='_blank'>&nbsp;Vincenzo Web Dev&nbsp;</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Copyright