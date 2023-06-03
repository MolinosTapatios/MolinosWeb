import React from "react"
import CardProducto from "componentes/CardProduct"
import './index.css'

function VistaProducto({ data = [] }) {

    // const bucleFor = () => {

    //     return
    // }
console.log(data)
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
                            images={p.imagenes}
                            descripcion={p.descripcion}
                            caracteristicas={p.caracteristicas} />
                    )
                }
                {
                    // bucleFor()
                }
            </div>
        </>
    )
}

export default VistaProducto