import React from 'react';
import Button from './Button';

const Card = ({ title, price, href }) => {
  return (
    <article className="card">
      <div className="h-40 bg-gray-50 rounded-md flex items-center justify-center text-gray-300">Immagine</div>
      <h4 className="mt-3 font-medium">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">Breve descrizione che invoglia al click.</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-lg font-semibold text-indigo-600">{price}</div>
        <a href={href}>
          <Button variant="outline">Vai ad Amazon</Button>
        </a>
      </div>
    </article>
  );
};

export default Card;
