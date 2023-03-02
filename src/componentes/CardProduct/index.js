import React  from "react"
import "./index.css"
import Carrusel from "componentes/Carrusel";
import setCarrito from "services/setCarrito";
import useUser from 'hooks/useUser';


function CardProducto({ id, nombre, precio, images } = {}) {

    const { user_id } = useUser()

    // console.log(images)

    function addCart() {
        setCarrito({cantidad:1,idProducto:id, idUsuer:user_id, mantener:true})
        .then(resp=>resp.flag && "")
    }

    return (
        <>
            {/* <ToastAlert color={alert.color} estado={alert.estado} mensaje={alert.mensaje} /> */}
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