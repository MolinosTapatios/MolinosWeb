import { URL } from './config.js'

const apiURL = `${URL}/main.php`

class Producto {

    constructor({ id = null, nombre = null, descripcion = null, caracteristicas = null, precio = null, precioPublico = null, stock = null, status = null, tipo = null, as = null, imagenes = null }) {
        this._id = id
        this._nombre = nombre
        this._descripcion = descripcion
        this._caracteristicas = caracteristicas
        this._precio = precio
        this._precioPublico = precioPublico
        this._stock = stock
        this._status = status
        this._tipo = tipo
        this._as = as
        this._imagenes = imagenes
    }

    set id(newId) {
        this._id = newId
    }
    get id() {
        return this._id
    }
    set nombre(newNombre) {
        this._nombre = newNombre
    }
    get nombre() {
        return this._nombre
    }
    set descripcion(newDescripcion) {
        this._descripcion = newDescripcion
    }
    get descripcion() {
        return this._descripcion
    }
    set caracteristicas(newCaracteristicas) {
        this._caracteristicas = newCaracteristicas
    }
    get caracteristicas() {
        return this._caracteristicas
    }
    set precio(newPrecio) {
        this._precio = newPrecio
    }
    get precio() {
        return this._precio
    }
    set precioPublico(newPrecioPublico) {
        this._precioPublico = newPrecioPublico
    }
    get precioPublico() {
        return this._precioPublico
    }
    set stock(newStock) {
        this._stock = newStock
    }
    get stock() {
        return this._stock
    }
    set status(newStatus) {
        this._status = newStatus
    }
    get status() {
        return this._status
    }
    set tipo(newTipo) {
        this._tipo = newTipo
    }
    get tipo() {
        return this._tipo
    }
    set as(newAs) {
        this._as = newAs
    }
    get as() {
        return this._as
    }
    set imagenes(newImagenes) {
        this._imagenes = newImagenes
    }
    get imagenes() {
        return this._imagenes
    }

    //----------------------------------------------------------------
    //           Pruebas
    //----------------------------------------------------------------
    pruebas(producto) {

        return fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({ accion: "asd", producto: producto })
        })
            .then(res => res.json())
            .then(res => { return res })
    }


    //----------------------------------------------------------------
    //----------Todos los productos para el Home------------------
    //----------------------------------------------------------------
    getProductosHome(p) {

        return fetch(apiURL, {
            body: JSON.stringify({ accion: "getProductosHome", producto: p }),
            method: 'POST'
        })
            .then((res) => res.json())
            .then(this.fromAjaxResponseToProducts)
    }
    //----------------------------------------------------------------
    //----------Todos los productos para el Catalogo------------------
    //----------------------------------------------------------------
    getProductosCatalogo(p) {

        return fetch(apiURL, {
            body: JSON.stringify({ accion: "getProductosCatalogo", producto: p }),
            method: 'POST'
        })
            .then((res) => res.json())
            .then(this.fromAjaxResponseToProducts)
    }
    //----------------------------------------------------------------
    //  Comprueba que sea un arreglo sino devuelve una arreglo vacio
    //----------------------------------------------------------------
    fromAjaxResponseToProducts(response) {

        if (response.flag) {
            const arr = response.msg.map(a => JSON.parse(a))
            if (Array.isArray(arr)) {
                return arr
            }
        }
        return []
    }
    //----------------------------------------------------------------
    //         Informacion completa de un solo Producto
    //----------------------------------------------------------------
    getSingleProduct(p) {

        return fetch(apiURL, {
            body: JSON.stringify({ accion: "getSingleProducto", producto: p }),
            method: "POST"
        })
            .then(resp => resp.json())
            .then(this.ajaxGetSingleProducto)
    }

    ajaxGetSingleProducto(response) {
        if (response.msg) {
            return response.msg
        }
        return null
    }
    //----------------------------------------------------------------
    //           Registra un producto
    //----------------------------------------------------------------
    crearProducto({ formdata } = { formdata: new FormData() }) {

        formdata.append("accion", "crearProducto")
        
        return fetch(apiURL, {
            method: 'POST',
            body: formdata,
        })
        .then(res => res.json())
        .then(resp => { return resp })
    }
    //----------------------------------------------------------------
    //           Elimina un producto
    //----------------------------------------------------------------
    removeProduct(p) {
        
        return fetch(apiURL, {
            body: JSON.stringify({
                accion: "deleteProducto",
                producto: p
            }),
            method: "POST"
        })
        .then((res) => res.json())
        .then(resp => { return resp })
    }
    //----------------------------------------------------------------
    //           Actualiza un producto
    //----------------------------------------------------------------
    updateProduct({ formdata } = {}) {
        
        formdata.append("accion", "updateProducto")
        
        return fetch(apiURL, {
            body: formdata,
            method: "POST"
        })
            .then(resp => resp.json())
            .then(resp => { return [] })
    }

}
//----------------------------------------------------------------
//           Exportacion de todas las funciones
//----------------------------------------------------------------
export { Producto }