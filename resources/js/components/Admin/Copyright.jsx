import { Link } from '@inertiajs/react';

const getDate = () => {
  const today = new Date();
  return `${today.getFullYear()}`;
};

const Copyright = () => {
  const currentDate = getDate();

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
            <nav>
              <ul className="m-0 p-0">
                <li>
                  <Link href={route('admin')}>Dashboard</Link>
                </li>
                <li>
                  <Link href={route('settings.index')}>Impostazioni</Link>
                </li>
                <li>
                  <Link href={route('admin.profile')}>Profilo</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-md-6">
            <p className="copyright d-flex justify-content-md-end justify-content-start mb-0">
              &copy; {currentDate} Quick CMS Admin
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Copyright;
