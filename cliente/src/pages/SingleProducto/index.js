import Carrusel from "componentes/Carrusel"
import React from "react"
import { useLocation, useParams } from "react-router-dom"
import './index.css'

export default function SingleProducto() {

    const { name } = useParams()
    const {state} = useLocation()

    return (
        <>
            <div className="contenedor">
                <div className="single-product row">
                    <div className="single-product-image col" >
                        <Carrusel images={state.imgs} />
                    </div>
                    <div className="single-product-info col">
                        <h2>{name}</h2>
                        <p className="info-precio">{state.precio}</p>
                        <p className="info-text">Características:</p>
                        <p>{state.caracteristicas}</p>
                        <p className="info-text">Descripción:</p>
                        <p>{state.descripcion}</p>
                        <button className="btn btn-primary" >Agregar a carrito</button>
                    </div>
                </div>
            </div>
        </>
    )
}
