import React from "react"
import CardProducto from "componentes/CardProduct"
import './index.css'

function VistaProducto({ data = [] }) {

    return (
        <>
            <div className="carrusel-cards">
                {
                    data.map(p =>
                        <CardProducto 
                            key={p.id}
                            id={p.id}
                            nombre={p.nombre}
                            precio={p.precio}
                            images={p.imagenes} />
                    )
                }
            </div>
        </>
    )
}

export default VistaProducto