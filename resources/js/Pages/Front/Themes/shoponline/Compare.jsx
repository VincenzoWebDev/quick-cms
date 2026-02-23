import React from 'react';
import CompareTable from './components/CompareTable';
import Layout from './Layout';

const Compare = ({ products = [] }) => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold">Confronta prodotti</h2>
        {products.length === 0 ? (
          <p className="mt-4 text-gray-600">Nessun prodotto selezionato per il confronto. Aggiungi prodotti dalla pagina prodotto o usa la lista prodotti.</p>
        ) : (
          <div className="mt-6">
            <CompareTable products={products} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Compare;
