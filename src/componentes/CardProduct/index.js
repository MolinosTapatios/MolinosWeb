import React from "react"
import "./index.css"
import { URL } from "services/config"

function CardProducto({ id, nombre, precio } = {}) {
    

    return (
        <>
            <div className="card m-2" style={{width:"18rem"}}>
                <img src={`${URL}/img/img_2023022400241649c61da02f53d04a994b93.jpg`} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{nombre}</h5>
                        <p className="card-text">${precio}</p>
                        <button id={id} className="btn btn-primary">Agregar a carrito</button>
                    </div>
            </div>
        </>
    )
}

export default CardProducto