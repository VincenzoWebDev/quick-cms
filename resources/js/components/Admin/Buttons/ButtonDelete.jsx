const ButtonDelete = ({ url }) => {
    return (
        <button className="btn px-2">
            <div className="over-icon">
                <img src={`${url}img/icons/delete.png`} alt="delete" className='original' />
                <img src={`${url}img/icons/delete-over.png`} alt="delete" className='overized' />
            </div>
        </button>
    )
}

export default ButtonDelete;
