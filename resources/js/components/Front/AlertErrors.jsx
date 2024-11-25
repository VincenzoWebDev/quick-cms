const AlertErrors = ({ message, status }) => {

    return (
        <>
            {
                message && (
                    <div className={`alert alert-${message.tipo} fadeout`} role="alert">
                        <strong>{message.testo}</strong>
                    </div>
                )
            }
            {
                status && (
                    <div className="alert alert-success fadeout" role="alert">
                        <strong>{status}</strong>
                    </div>

                )
            }
        </>
    )
}

export default AlertErrors;