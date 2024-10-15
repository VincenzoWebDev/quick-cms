const InputErrors = ({ errors }) => {
    return (
        <>
            {errors && Object.keys(errors).length > 0 &&
                <div className="alert alert-danger">
                    {Object.values(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            }
        </>
    )
}

export default InputErrors