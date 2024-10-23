import React from 'react';

const Skeleton = () => (
    <div className="skeleton">
        {/* Simulazione di una intestazione */}
        <div className="skeleton-header"></div>

        {/* Simulazione di una lista di elementi o paragrafi */}
        <div className="skeleton-content-row"></div>
        <div className="skeleton-content-row"></div>
        <div className="skeleton-content-row"></div>

        {/* Simulazione di una sezione più grande, tipo una card o box */}
        <div className="skeleton-large-block"></div>

        {/* Simulazione di altri paragrafi o sezioni più piccole */}
        <div className="skeleton-content-row"></div>
        <div className="skeleton-content-row"></div>
    </div>
);

export default Skeleton;
