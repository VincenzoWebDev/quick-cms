import React from 'react';

const FrontendErrorPage = ({ status, message }) => {
  return (
    // <div style={{ textAlign: "center", padding: "50px", backgroundColor: "#e3f2fd", color: "#0d47a1" }}>
    //     <h1>Oops! Errore {status}</h1>
    //     <p>{message || "Qualcosa è andato storto."}</p>
    // </div>
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center"
      style={{
        background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
        color: '#333',
      }}
    >
      <h1 className="display-1 fw-bold text-primary">{status}</h1>
      <p className="fs-4 text-muted mb-4">{message || 'La pagina che cerchi non è disponibile.'}</p>
      <a href={route('home')} className="btn btn-outline-primary px-4 py-2">
        Torna alla Home
      </a>
    </div>
  );
};

export default FrontendErrorPage;
