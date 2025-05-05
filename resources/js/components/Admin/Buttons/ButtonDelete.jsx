const ButtonDelete = ({ url, height, width }) => {
  return (
    <button className="btn px-2">
      <div className="over-icon" style={{ height: `${height}px`, width: `${width}px` }}>
        <img src={`${url}img/icons/delete.png`} alt="delete" className="original" />
        <img src={`${url}img/icons/delete-over.png`} alt="delete" className="overized" />
      </div>
    </button>
  );
};

export default ButtonDelete;
