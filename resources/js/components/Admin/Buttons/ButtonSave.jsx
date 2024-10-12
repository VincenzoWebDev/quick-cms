const ButtonSave = ({ url }) => {
    return (
        <div className="over-icon">
            <img src={`${url}img/icons/download.png`} alt="save" className='original' />
            <img src={`${url}img/icons/download-over.png`} alt="save" className='overized' />
        </div>
    )
}

export default ButtonSave;
