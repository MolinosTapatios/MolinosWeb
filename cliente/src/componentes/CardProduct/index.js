import React from "react"
import "./index.css"
import Carrusel from "componentes/Carrusel";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function CardProducto({ id, nombre, precio, images, descripcion, caracteristicas } = {}) {

    const navigate = useNavigate()

    precio = parseInt(precio).toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN'
    })

    const redirection = useCallback(() => {
        navigate(`/detalles/${nombre}`, {
            state: {
                imgs: images,
                id: id,
                descripcion: descripcion,
                precio: precio,
                caracteristicas: caracteristicas
            }
        })
        // eslint-disable-next-line
    }, [navigate, id])

    return (
        <>
            <div className="card m-2" onClick={redirection} style={{ width: "18rem" }}>
                <Carrusel images={images} />
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    <p className="card-text" style={{ fontSize: "20px" }}>{precio}</p>
                    <p>Descipcion:</p>
                    <p>{descripcion.substring(0, 60)}...</p>
                </div>
            </div>
        </>
    )
}

export default CardProducto