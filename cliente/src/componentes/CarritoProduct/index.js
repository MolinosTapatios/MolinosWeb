import React, { useState, useEffect } from 'react'
import useUser from 'hooks/useUser'
import { URL } from 'services/config'
import './index.css'
import { Carrito } from 'services/carrito'


function CarritoProduct({ id, nombre, cantidad_producto, stock, precio, path, total, render, setAlert, i }) {

    const { user } = useUser()
    const [cantidad, setCantidad] = useState(parseInt(cantidad_producto))
    const [state, setstate] = useState({ loading: false, error: false })
    const [flag, setFlag] = useState(false)

    function removeOfCart() {
        const c = new Carrito({ usuarioId: parseInt(user.id) })
        c.deleteProduct({ c, producto_id: parseInt(id) })
            .then((resp) => {
                if (resp.flag) {
                    setAlert({ color: "warning", estado: true, mensaje: resp.msg })
                    render()
                }
            })
    }

    function addProducto() {
        if (cantidad < stock) {
            setCantidad(1 + cantidad)
            setFlag(true)
        }
    }
    function removeProducto() {
        if (cantidad !== 1) {
            setCantidad(cantidad - 1)
            setFlag(true)
        }
    }

    useEffect(() => {
        if (flag) {
            setstate({ loading: true, error: false })
            const c = new Carrito({ usuarioId: user.id })
            c.addCarrito({ cantidad: cantidad, idProducto: id, mantener: false, carrito: c })
                .then(resp => {
                    if (resp.flag) {
                        total(resp.total)
                        setstate({ loading: false, error: false })
                    } else {
                        setstate({ loading: false, error: true })
                    }
                })
                .catch(setstate({ loading: false, error: true }))
            setFlag(false)
        }
    }, [cantidad, cantidad_producto, id, total, user, flag])

    function esPar(key) {
        return key % 2 === 0
    }

    return (
        <>
            <div style={{ background: (esPar(i) ? '#0d6efd36' : '#80808054') }} className='fila-carrito' >
                <div className="row align-items-center text-nowrap">
                    <img className="col product-img" src={URL + `/` + (path !== null ? path : "img/null.jpg")} alt="Producto 1" />
                    <span className="col product-name">{nombre}</span>
                    <div className="col-2 text-center" style={{display:'inline-table'}}>
                        <div className="cantidad">
                            <span className="remove" onClick={removeProducto} disabled={state.loading} >-</span>
                            <div className="product-name">{cantidad}</div>
                            <span className="add" onClick={addProducto} disabled={state.loading}>+</span>
                        </div>
                        <div className="stock">{stock} disponibles</div>
                    </div>
                    {
                        state.loading &&
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                    <div className="col product-price text-end">$ {precio * cantidad}.00</div>
                </div>
                <span className="row remove-button" onClick={removeOfCart}>Eliminar</span>
            </div>
            <hr />
        </>
    )
}

export default CarritoProduct