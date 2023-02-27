import { URL } from './config'

const fromAjaxResponse = (response) => {
    return response
}

//Agrega un producto a carrito
function setCarrito({ idUsuer, idProducto, cantidad, mantener }) {
    
    return fetch(`${URL}/setCarrito.php`, {
        method: 'POST',
        body: JSON.stringify({
            producto_id: idProducto,
            user_id: idUsuer,
            cantidad: cantidad,
            mantener:mantener
        }),
    })
        .then(res => res.json())
        .then(fromAjaxResponse)
}

export default setCarrito