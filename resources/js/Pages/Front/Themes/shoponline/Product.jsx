import React from 'react';
import { Link, router } from '@inertiajs/react';
import Button from './components/Button';
import Layout from './Layout';

const Product = ({ product }) => {
  if (!product) {
    return <div className="p-6">Prodotto non trovato.</div>;
  }

  function addToCompare() {
    const stored = JSON.parse(localStorage.getItem('compare') || '[]');
    if (!stored.includes(product.id)) {
      stored.push(product.id);
      localStorage.setItem('compare', JSON.stringify(stored));
    }
    router.visit(`/shoponline/compare?ids=${stored.join(',')}`);
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="h-80 bg-gray-50 rounded-md flex items-center justify-center text-gray-300">
              Immagine prodotto
            </div>
            <h1 className="mt-6 text-2xl font-bold">{product.title}</h1>
            <p className="mt-3 text-gray-600">
              Prezzo: <span className="font-semibold text-indigo-600">€{product.price}</span>
            </p>
            <div className="mt-4">
              <h4 className="font-medium">Specifiche</h4>
              <ul className="mt-2 text-sm text-gray-600">
                {Object.entries(product.specs || {}).map(([k, v]) => (
                  <li key={k}>
                    <strong>{k}:</strong> {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="p-4 border border-gray-100 rounded-lg">
            <div className="text-xl font-bold text-indigo-600">€{product.price}</div>
            <div className="mt-4 flex flex-col gap-3">
              <Button onClick={addToCompare}>Aggiungi a Compare</Button>
              <a href="#" className="text-center text-sm text-indigo-600 hover:underline">
                Vai ad Amazon
              </a>
              <Link href="/shoponline/products" className="text-center text-sm text-gray-600 hover:underline">
                Torna ai prodotti
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
