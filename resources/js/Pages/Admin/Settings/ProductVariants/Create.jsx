import Layout from '@/Layouts/Admin/Layout';
import { Link, useForm } from '@inertiajs/react';
import { InputErrors } from '@/components/Admin/Index';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Create = ({ flash }) => {
  useEffect(() => {
    if (flash?.message) {
      if (flash.message.tipo === 'success') {
        toast.success(flash.message.testo);
      } else if (flash.message.tipo === 'danger') {
        toast.error(flash.message.testo);
      }
    }
  }, [flash]);
  const { data, setData, post, errors, processing } = useForm({
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('settings.variants.store'));
  };

  return (
    <Layout>
      <h2>Inserisci una nuova variante</h2>
      <InputErrors errors={errors} />

      <div className="row">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Nome variante
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Nome variante"
                value={data.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <button className="btn cb-primary me-3" disabled={processing}>
                {processing ? 'In corso...' : 'Inserisci'}
              </button>
              <Link href={route('settings.variants.index')} className="btn btn-secondary">
                Torna indietro
              </Link>
            </div>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </Layout>
  );
};
export default Create;
