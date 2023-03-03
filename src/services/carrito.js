import { URL } from "./config";

const apiURL = `${URL}/carrito.php`

class Carrito {

    constructor({ id = null, total = null, usuarioId = null }) {
        this._id = id
        this._total = total
        this._usuarioId = usuarioId
    }

    get id() {
        return this._id
    }
    set id(id) {
        this._id = id
    }
    get total() {
        return this._total
    }
    set total(total) {
        this._total = total
    }
    get usuarioId() {
        return this._usuarioId
    }
    set usuarioId(usuarioId) {
        this._usuarioId = usuarioId
    }

    //----------------------------------------------------------------
    // Elimina un producto del carrito de compras
    //----------------------------------------------------------------
    deleteProduct({ c, producto_id }) {


        return fetch(apiURL, {
            method: "POST",
            body: JSON.stringify({
                accion: "deleteProductoDeCarrito",
                carrito: c,
                producto_id: producto_id
            })
        })
            .then(resp => resp.json())
            .then(resp => {
                if (resp.flag) {
                    return resp.msg
                }
                return []
            })
    }
    //----------------------------------------------------------------
    // consulta todos los productos en en carrito
    //----------------------------------------------------------------
    fromAjaxResponse = response => {
        if (response.flag) {
            return response.msg
        }
        return []
    }
    
    getCarrito(c) {
        
        return fetch(apiURL, {
            method: "POST",
            body: JSON.stringify({
                accion: "getCarrito",
                'carrito': c
            })
        })
            .then(resp => resp.json())
            .then(this.fromAjaxResponse)
    }
    //----------------------------------------------------------------
    //Agrega un producto a carrito
    //----------------------------------------------------------------
    addCarrito({ idProducto, cantidad, mantener, carrito}) {

        return fetch(`${URL}/carrito.php`, {
            method: 'POST',
            body: JSON.stringify({
                accion: "addCarrito",
                producto_id: idProducto,
                cantidad: cantidad,
                mantener: mantener,
                carrito: carrito
            }),
        })
            .then(res => res.json())
            .then(resp => { 
                if(resp.flag){
                    return resp.msg
                }
                return [] 
            })
    }
}

export { Carrito }