import React from "react";

const AdminErrorPage = ({ status, message }) => {
    return (
        <div style={{ textAlign: "center", padding: "50px", backgroundColor: "#f8d7da", color: "#721c24" }}>
            <h1>Oops! Errore {status}</h1>
            <p>{message || "Si è verificato un errore imprevisto."}</p>
        </div>
    );
};

export default AdminErrorPage;
