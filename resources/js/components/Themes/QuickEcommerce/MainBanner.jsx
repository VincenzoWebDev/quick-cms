import React from 'react';
import { BadgePercent, Shirt, Truck } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

const MainBanner = () => {
  const { component } = usePage();
  const isHome = component === 'Front/Themes/quick_ecommerce/HomeComponent';
  return (
    <>
      {isHome ? (
        <section
          style={{
            background: 'linear-gradient(to right, #fff, #3498db)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
          }}
        >
          <div className="container-lg">
            <div className="row align-items-center">
              <div className="col-lg-6 pt-5 mt-5">
                <h2 className="display-1 ls-1">
                  <span className="fw-bold text-primary">Abbigliamento</span> e <br />
                  Accessori<span className="fw-bold"> Sportivi</span>
                </h2>
                <p className="fs-4">Scopri i nuovi arrivi.</p>
                <div className="d-flex gap-3">
                  <Link href={route('productList')} className="btn btn-primary text-uppercase fs-6 rounded-pill px-4 py-3 mt-3">
                    Inizia lo Shopping
                  </Link>
                  <Link href={route('user.profile.login.index')} className="btn btn-dark text-uppercase fs-6 rounded-pill px-4 py-3 mt-3">
                    Iscrivi ora
                  </Link>
                </div>
                <div className="row my-5">
                  <StatInfo count="14k+" label="Prodotti diversi" />
                  <StatInfo count="50k+" label="Clienti felici" />
                  <StatInfo count="10+" label="Varianti disponibili" />
                </div>
              </div>
              <div className="floating-shoe col-lg-6">
                <picture>
                  <source srcSet="themes/quick_ecommerce/img/shoe-img.webp" type="image/webp" />
                  <img
                    src="themes/quick_ecommerce/img/shoe-img.png"
                    alt="Scarpa sportiva in evidenza"
                    width="1032"
                    height="781"
                    className="img-fluid shoe-hero-image"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-3 g-0 justify-content-center">
              <CardInfo
                color="bg-primary"
                icon={<BadgePercent size={60} strokeWidth={1.2} />}
                title="Promozioni e offerte speciali"
                text="Offerte Imperdibili! - Sconti fino al 50% su capi selezionati."
              />
              <CardInfo
                color="bg-secondary"
                icon={<Shirt size={60} strokeWidth={1.2} />}
                title="Attrezzatura per Stagione"
                text="Preparati alla nuova stagione - Comfort e stile per ogni sport!"
              />
              <CardInfo
                color="bg-danger"
                icon={<Truck size={60} strokeWidth={1.2} />}
                title="Spedizione gratuita"
                text="Spedizioni gratuite con ordini superiori a 49€."
              />
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

const StatInfo = ({ count, label }) => (
  <div className="col">
    <div className="row text-dark">
      <div className="col-auto">
        <p className="fs-1 fw-bold lh-sm mb-0">{count}</p>
      </div>
      <div className="col">
        <p className="text-uppercase lh-sm mb-0">{label}</p>
      </div>
    </div>
  </div>
);

const CardInfo = ({ color, icon, title, text }) => (
  <div className="col">
    <div className={`card border-0 ${color} rounded-0 p-4 text-light`}>
      <div className="row">
        <div className="col-md-3 d-flex align-items-center justify-content-center">{icon}</div>
        <div className="col-md-9">
          <div className="card-body p-0">
            <h5 className="text-light">{title}</h5>
            <p className="card-text">{text}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MainBanner;
