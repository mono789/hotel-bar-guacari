import React from "react";

const Loader = ({ variable }) => {
    return variable ? (
        <div className="text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Cargando...</span>
            </div>
        </div>
    ) : (
        ""
    );
};

export default Loader;
