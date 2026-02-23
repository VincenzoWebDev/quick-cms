import React from 'react';
import Button from './components/Button';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <header className="w-full border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-bold">A</div>
            <div>
              <h1 className="text-lg font-semibold">ShopOnline</h1>
              <p className="text-xs text-gray-500">Tema minimal per affiliazione</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="/shoponline/products" className="hover:text-indigo-600">Prodotti</a>
            <a href="/shoponline/compare" className="hover:text-indigo-600">Compare</a>
            <a href="/shoponline" className="hover:text-indigo-600">Home</a>
            <Button variant="outline">Login</Button>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-20 border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShopOnline — Minimal theme demo
      </footer>
    </div>
  );
};

export default Layout;
