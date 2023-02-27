import React  from "react"
import "./index.css"
import Carrusel from "componentes/Carrusel";
import setCarrito from "services/setCarrito";
import useUser from 'hooks/useUser';
import ToastAlert from "componentes/Toast";
import { useState } from "react";


function CardProducto({ id, nombre, precio, images } = {}) {

    const { user_id } = useUser()
    const [alert, setAlert] = useState({mensaje:null,estado:false,color:null})

    function addCart() {
        setCarrito({cantidad:1,idProducto:id, idUsuer:user_id, mantener:true})
        .then(resp=>resp.flag && setAlert({color:"info",estado:true,mensaje:resp.msg}))
    }

    return (
        <>
            <ToastAlert color={alert.color} estado={alert.estado} mensaje={alert.mensaje} />
            <div className="card m-2" style={{ width: "18rem" }}>
                {
                    images.length !== 0  && <Carrusel images={images} />
                }
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    <p className="card-text">${precio}</p>
                    <button id={id} className="btn btn-primary" onClick={addCart}>Agregar a carrito</button>
                </div>
            </div>
        </>
    )
}

export default CardProducto