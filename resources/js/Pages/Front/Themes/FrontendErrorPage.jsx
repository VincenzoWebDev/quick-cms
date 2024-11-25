import React from "react";

const FrontendErrorPage = ({ status, message }) => {
    return (
        <div style={{ textAlign: "center", padding: "50px", backgroundColor: "#e3f2fd", color: "#0d47a1" }}>
            <h1>Oops! Errore {status}</h1>
            <p>{message || "Qualcosa è andato storto."}</p>
        </div>
    );
};

export default FrontendErrorPage;
