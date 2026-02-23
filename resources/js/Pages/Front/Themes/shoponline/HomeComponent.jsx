import React from 'react';
import '../../../../../css/shoponline/app.css';
import Layout from './Layout';

const HomeComponent = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Promuovi prodotti Amazon con stile minimal
            </h2>
            <p className="mt-4 text-gray-600">
              Design pulito, pochi colori scelti per mettere in evidenza i prodotti. Layout veloce, responsive e
              ottimizzato per conversione.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-500"
              >
                Vedi prodotti
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Contattami
              </a>
            </div>
          </div>
          <div className="w-full">
            <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-56">
              <div className="text-center text-gray-400">Placeholder immagine prodotto</div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            ['Minimal', 'Layout essenziale che mette in evidenza il prodotto.'],
            ['Veloce', 'Ottimizzato per performance e caricamento rapido.'],
            ['Responsive', 'Funziona bene su mobile e desktop.'],
          ].map(([title, desc]) => (
            <div key={title} className="p-6 border border-gray-100 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </section>

        <section id="products" className="mt-16">
          <h3 className="text-2xl font-bold">Prodotti in evidenza</h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <article key={i} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition">
                <div className="h-40 bg-gray-50 rounded-md flex items-center justify-center text-gray-300">
                  Immagine
                </div>
                <h4 className="mt-3 font-medium">Titolo prodotto {i + 1}</h4>
                <p className="mt-2 text-sm text-gray-600">Breve descrizione che invoglia al click.</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-lg font-semibold text-indigo-600">€19.99</div>
                  <a className="text-sm text-indigo-500 hover:underline" href="#">
                    Vai ad Amazon
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-16 py-12 border-t border-gray-100">
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold">Contattami per integrare l'affiliazione</h3>
            <p className="mt-2 text-gray-600">
              Posso aiutarti a collegare feed prodotti, link di affiliazione e design personalizzato.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomeComponent;
