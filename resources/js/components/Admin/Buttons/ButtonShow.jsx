const ButtonShow = ({ url }) => {
    return (
        <div className="over-icon">
            <img src={`${url}img/icons/view.png`} alt="view" className="original" />
            <img src={`${url}img/icons/view-over.png`} alt="view" className='overized' />
        </div>
    )
}

export default ButtonShow;