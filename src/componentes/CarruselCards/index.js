import React from "react"
import CardProducto from "componentes/CardProduct"
import './index.css'

function VistaProducto({ data = [] }) {
    // {Tipo_Producto_id: '1', id: '1', nombre: 'R-14', precio: '3500', stock: '4', …}
    return (
        <>
            <div className="carrusel-cards">
                {
                    data.map(p =>
                        <CardProducto key={p.id} id={p.id} nombre={p.nombre} precio={p.precio} />
                    )
                }
            </div>
        </>
    )
}

export default VistaProducto