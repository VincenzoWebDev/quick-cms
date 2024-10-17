const ButtonEdit = ({ url }) => {
    return (
        <div className="over-icon">
            <img src={`${url}/img/icons/edit.png`} alt="edit" className='original' />
            <img src={`${url}/img/icons/edit-over.png`} alt="edit" className='overized' />
        </div>
    )
}

export default ButtonEdit;

