import { router } from "@inertiajs/react";
import React from "react";

const AdminErrorPage = ({ status, message }) => {
    return (
        // <div style={{ textAlign: "center", padding: "50px", backgroundColor: "#f8d7da", color: "#721c24" }}>
        //     <h1>Oops! Errore {status}</h1>
        //     <p>{message || "Si è verificato un errore imprevisto."}</p>
        // </div>
        <div
            className="d-flex flex-column justify-content-center align-items-center vh-100 text-center"
            style={{
                background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
                color: "#333",
            }}
        >
            <h1 className="display-1 fw-bold text-primary">{status}</h1>
            <p className="fs-4 text-muted mb-4">
                {message || "La pagina che cerchi non è disponibile."}
            </p>
            <a href="/" className="btn btn-outline-primary px-4 py-2">
                Torna alla Home
            </a>
        </div>
    );
};

export default AdminErrorPage;
