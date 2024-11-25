const SlideshowCaption = ({ title, testo }) => {
    return (
        <div className="container-caption">
            <div className="box">
                <div className="title">
                    <span className="block"></span>
                    <h1>{title}<span></span></h1>
                </div>

                <div className="role">
                    <div className="block"></div>
                    <p>{testo}</p>
                </div>
            </div>
        </div>
    )
}

export default SlideshowCaption