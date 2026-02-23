import React from 'react';

const CompareTable = ({ products = [] }) => {
  // Collect all spec keys
  const specKeys = Array.from(new Set(products.flatMap((p) => Object.keys(p.specs || {}))));

  return (
    <div className="overflow-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-left">Specifiche</th>
            {products.map((p) => (
              <th key={p.id} className="p-3 text-left">
                <div className="font-semibold">{p.title}</div>
                <div className="text-indigo-600">€{p.price}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specKeys.map((key) => (
            <tr key={key} className="border-t">
              <td className="p-3 font-medium w-48">{key}</td>
              {products.map((p) => (
                <td key={p.id + key} className="p-3">
                  {p.specs?.[key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
