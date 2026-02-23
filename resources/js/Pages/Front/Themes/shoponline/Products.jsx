import React from 'react';
import { Link } from '@inertiajs/react';
import Card from './components/Card';

const Products = ({ products = [] }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-extrabold">Prodotti</h2>
        <p className="mt-2 text-gray-600">Elenco prodotti demo — clicca per vedere il dettaglio.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id}>
              <Card title={p.title} price={`€${p.price}`} href={`/shoponline/product/${p.id}`} />
              <div className="mt-2 flex gap-2">
                <Link href={`/shoponline/product/${p.id}`} className="text-sm text-indigo-600 hover:underline">
                  Dettagli
                </Link>
                <Link href={`/shoponline/compare?ids=${p.id}`} className="text-sm text-gray-600 hover:underline">
                  Compare
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
