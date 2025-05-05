const ButtonEdit = ({ url, height, width }) => {
  return (
    <div className="over-icon" style={{ height: `${height}px`, width: `${width}px` }}>
      <img src={`${url}img/icons/edit.png`} alt="edit" className="original" />
      <img src={`${url}img/icons/edit-over.png`} alt="edit" className="overized" />
    </div>
  );
};

export default ButtonEdit;
