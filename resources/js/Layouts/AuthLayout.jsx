import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import DemoModeBanner from '@/components/DemoModeBanner';

const AuthLayout = ({ title, subtitle, icon = 'fa-shield-halved', children, alternateAction, infoMessage }) => {
  const { demo_mode } = usePage().props;

  useEffect(() => {
    const savedTheme = localStorage.getItem('data-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <>
      {Number(demo_mode) === 1 && <DemoModeBanner />}
      <div className={`auth-shell ${Number(demo_mode) === 1 ? 'has-demo-banner' : ''}`}>
        <div className="auth-bg-orb auth-bg-orb-left"></div>
        <div className="auth-bg-orb auth-bg-orb-right"></div>

        <div className="auth-shell-inner container-fluid">
          <div className="row g-4 align-items-stretch justify-content-center">
            <div className="col-xl-5 col-lg-6">
              <aside className="auth-side-card">
                <Link href={route('home')} className="auth-brand">
                  <i className="fa-solid fa-cubes-stacked"></i>
                  <span>Quick CMS</span>
                </Link>

                <h1>{title}</h1>
                <p>{subtitle}</p>

                <div className="auth-side-points">
                  <div className="auth-side-point">
                    <i className="fa-solid fa-bolt"></i>
                    <span>Interfaccia amministrativa moderna e veloce</span>
                  </div>
                  <div className="auth-side-point">
                    <i className="fa-solid fa-shield-halved"></i>
                    <span>Accesso protetto e gestione account centralizzata</span>
                  </div>
                  <div className="auth-side-point">
                    <i className="fa-solid fa-sliders"></i>
                    <span>Esperienza coerente con il pannello di controllo</span>
                  </div>
                </div>
              </aside>
            </div>

            <div className="col-xl-5 col-lg-6">
              <section className="auth-form-card">
                <div className="auth-form-head">
                  <div className="auth-form-icon">
                    <i className={`fa-solid ${icon}`}></i>
                  </div>
                  {alternateAction && <div className="auth-form-alt-action">{alternateAction}</div>}
                </div>

                {infoMessage && <div className="auth-inline-info">{infoMessage}</div>}

                {children}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
