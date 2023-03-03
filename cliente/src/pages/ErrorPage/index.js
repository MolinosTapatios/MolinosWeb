import React from "react";
import { Link } from "react-router-dom";

function ErrorPage(params) {
    return(
        <>
        <div className="text-center">
            <h1>Error 404</h1>
            <Link className="nav-link" to="/" style={{color:"white", fontSize:"25px", margin:"60px"}}> Regresar Inicio </Link>
        </div>
        </>
    )
}

export default ErrorPage