const ButtonDelete = ({ type = 'submit', onClick, className = '' }) => {
  return (
    <button
      type={type}
      className={`action-icon-btn action-delete ${className}`.trim()}
      aria-label="Elimina"
      onClick={onClick}
    >
      <i className="fa-solid fa-trash"></i>
    </button>
  );
};

export default ButtonDelete;
