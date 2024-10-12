const ButtonCancel = ({ url }) => {
    return (
        <div className="over-icon">
            <img src={`${url}img/icons/cross.png`} alt="cancel" className='original' />
            <img src={`${url}img/icons/cross-over.png`} alt="cancel" className='overized' />
        </div>
    )
}

export default ButtonCancel;

