import React from "react"
import "./index.css"
import Carrusel from "componentes/Carrusel";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import useUser from 'hooks/useUser';
// import { Carrito } from "services/carrito";


function CardProducto({ id, nombre, precio, images, descripcion } = {}) {

    const navigate = useNavigate()

    precio = parseInt(precio).toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN'
    })

    const redirection = useCallback(() => {
        navigate(`/detalles/${nombre}`)
    },[nombre, navigate])

    // const { user_id } = useUser()

    // console.log(images)

    // function addCart() {
    //     const c = new Carrito({usuarioId:user_id})
    //     c.addCarrito({cantidad:1,idProducto:id, mantener:true, carrito:c})
    //     .then(resp=>resp.flag && "")
    // }

    return (
        <>
            {/* <ToastAlert color={alert.color} estado={alert.estado} mensaje={alert.mensaje} /> */}
            <div className="card m-2" onClick={redirection} style={{ width: "18rem" }}>
                {
                    images.length !== 0 && <Carrusel images={images} />
                }
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    <p className="card-text" style={{ fontSize: "20px" }}>{precio}</p>
                    <p>Descipcion:</p>
                    <p>{descripcion.substring(0, 60)}...</p>
                    {/* <button id={id} className="btn btn-primary" onClick={addCart}>Agregar a carrito</button> */}
                </div>
            </div>
        </>
    )
}

export default CardProducto