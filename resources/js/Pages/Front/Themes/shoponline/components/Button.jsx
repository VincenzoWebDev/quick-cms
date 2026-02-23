import React from 'react';

const Button = ({ children, variant = 'solid', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium';
  const styles =
    variant === 'outline'
      ? 'border border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
      : 'bg-indigo-600 text-white hover:bg-indigo-500';

  return (
    <button {...props} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
