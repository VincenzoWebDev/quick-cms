import { CheckoutCustomerCard, CheckoutHeader, CheckoutShippingMethods, InputErrors } from '@/components/Front/Index';
import { STORAGE_URL } from '@/constants/constants';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Link, useForm, usePage } from '@inertiajs/react';

const Checkout = ({ cartItems, shippingMethods }) => {
  const { user_auth } = usePage().props;

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  const { post, data, setData, errors } = useForm({
    name: user_auth.name,
    lastname: user_auth.lastname,
    email: user_auth.email,
    phone: user_auth.phone || '+39 ',
    address: '215 Clayton St.',
    civic: '14',
    province: 'San Francisco',
    city: 'CA',
    cap: '94117',
    shipping_method_id: '',
    total_price: getTotalPrice(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleShippingMethodChange = (shippingId) => {
    setData({ ...data, shipping_method_id: shippingId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('checkout.store'));
  };

  return (
    <EcommerceLayout>
      <CheckoutHeader />
      <section className="bg-light py-5">
        <div className="container">
          <div className="row">
            <InputErrors errors={errors} />
            <div className="col-xl-8 col-lg-8 mb-4">
              <CheckoutCustomerCard user={user_auth} />

              {/* Checkout */}
              <div className="card shadow-0 border">
                <div className="p-4">
                  <h5 className="card-title mb-3">Checkout ospite</h5>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <p className="mb-0">Nome</p>
                      <div className="form-outline">
                        <input
                          type="text"
                          id="checkout-name"
                          placeholder="Digita qui"
                          className="form-control"
                          value={data.name}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-6">
                      <p className="mb-0">Cognome</p>
                      <div className="form-outline">
                        <input
                          type="text"
                          id="checkout-lastname"
                          placeholder="Digita qui"
                          className="form-control"
                          value={data.lastname}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-6 mb-3">
                      <p className="mb-0">Telefono</p>
                      <div className="form-outline">
                        <input
                          type="tel"
                          name="phone"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          id="typePhone"
                          defaultValue={data.phone}
                          className="form-control"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col-6 mb-3">
                      <p className="mb-0">Email</p>
                      <div className="form-outline">
                        <input
                          type="email"
                          id="typeEmail"
                          placeholder="esempio@gmail.com"
                          className="form-control"
                          value={data.email}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Tienimi informato sulle novità
                    </label>
                  </div>

                  <hr className="my-4" />

                  <h5 className="card-title mb-3">Informazioni spedizione</h5>

                  <CheckoutShippingMethods
                    shippingMethods={shippingMethods}
                    selectedId={data.shipping_method_id}
                    onChange={handleShippingMethodChange}
                  />

                  <div className="row">
                    <div className="col-sm-8 mb-3">
                      <p className="mb-0">Indirizzo</p>
                      <div className="form-outline">
                        <input
                          type="text"
                          name="address"
                          id="checkout-address"
                          placeholder="Digita qui"
                          className="form-control"
                          value={data.address}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col-sm-4 mb-3">
                      <p className="mb-0">Civico</p>
                      <div className="form-outline">
                        <input
                          type="text"
                          name="civic"
                          id="checkout-civic"
                          placeholder="Digita qui"
                          className="form-control"
                          value={data.civic}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col-sm-4 mb-3">
                      <p className="mb-0">Città</p>
                      <select
                        className="form-select"
                        name="province"
                        aria-label="Seleziona provincia"
                        onChange={handleInputChange}
                      >
                        {/* <option value="">Seleziona una città</option> */}
                        <option value="San Francisco">San Francisco</option>
                      </select>
                    </div>

                    <div className="col-sm-4 mb-3">
                      <p className="mb-0">Paese</p>
                      <div className="form-outline">
                        <input
                          type="text"
                          name="city"
                          id="checkout-country"
                          placeholder="Digita qui"
                          className="form-control"
                          value={data.city}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col-sm-4 col-6 mb-3">
                      <p className="mb-0">CAP</p>
                      <div className="form-outline">
                        <input
                          type="text"
                          name="cap"
                          id="checkout-cap"
                          className="form-control"
                          value={data.cap}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="flexCheckDefault1" />
                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                      Salva questo indirizzo
                    </label>
                  </div>

                  <div className="mb-3">
                    <p className="mb-0">Messaggio al venditore</p>
                    <div className="form-outline">
                      <textarea className="form-control" id="textAreaExample1" rows="2"></textarea>
                    </div>
                  </div>

                  <div className="float-end">
                    <Link href={route('home')} className="btn btn-light border me-2">
                      Indietro
                    </Link>
                    <button className="btn btn-success shadow-0 border" onClick={handleSubmit}>
                      Continua
                    </button>
                  </div>
                </div>
              </div>
              {/* Checkout */}
            </div>
            <div className="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
              <div className="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: '320px', color: '#212529' }}>
                <h6 className="mb-3">Riepilogo</h6>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Prezzo totale:</p>
                  <p className="mb-2">€{getTotalPrice()}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Sconto:</p>
                  <p className="mb-2 text-danger">0</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Costo spedizione:</p>
                  <p className="mb-2 text-success">Gratis</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Totale:</p>
                  <p className="mb-2">€{getTotalPrice()}</p>
                </div>
                <button className="btn btn-dark w-100 mt-3">Paga ora</button>

                <hr />
                <h6 className="text-dark my-4">Prodotti nel carrello</h6>

                {cartItems.map((item) => (
                  <div className="d-flex align-items-center mb-4" key={item.id}>
                    <div className="me-3 position-relative col-md-4">
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        {item.quantity}
                      </span>
                      <Link
                        href={route('productDetail.index', {
                          slug: item.product.slug,
                          id: item.product.id,
                        })}
                        className="nav-link"
                      >
                        <img
                          src={STORAGE_URL + item.product.image_path}
                          className="img-sm rounded border img-fluid"
                          alt="Gaming Headset"
                        />
                      </Link>
                    </div>
                    <div className="col-md-8">
                      <span>{item.product.name}</span> <br />
                      <div className="price text-muted">Totale: {item.quantity * item.price} &euro;</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </EcommerceLayout>
  );
};
export default Checkout;
