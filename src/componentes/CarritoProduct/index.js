import React, { useState, useEffect } from 'react'
import useUser from 'hooks/useUser'
import { URL } from 'services/config'
import setCarrito from 'services/setCarrito'
import './index.css'
import { Producto } from 'services/producto'


function CarritoProduct({ id, nombre, cantidad_producto, stock, precio, path, total, render, setAlert}) {

    const { user_id } = useUser()
    const [cantidad, setCantidad] = useState(parseInt(cantidad_producto))
    const [state, setstate] = useState({ loading: false, error: false })
    const [flag, setFlag] = useState(false)
    
    function removeOfCart() {
        const p = new Producto({})
        p.deleteProduct({user_id: parseInt(user_id),producto_id: parseInt(id)})
        .then((resp) =>{
            if (resp.flag){
                setAlert({color:"warning",estado:true, mensaje:resp.msg})
                render()
                }
            })
    }

    function addProducto() {
        if (cantidad < stock) {
            setCantidad(1+cantidad)
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
            setCarrito({ cantidad: cantidad, idProducto: id, idUsuer: user_id, mantener: false })
                .then(resp => {
                    console.log(resp)
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
    }, [cantidad,cantidad_producto,id,total, user_id, flag])

    return (
        <>
            <div>
                <div className="row">
                    <img className="col product-img" src={URL + `/` + path} alt="Producto 1" />
                    <span className="col product-name">{nombre}</span>
                    <div className="col-2 text-center">
                        <div className="cantidad">
                            <button className="remove" onClick={removeProducto} disabled={state.loading} >-</button>
                            <div className="product-name">{cantidad}</div>
                            <button className="add" onClick={addProducto} disabled={state.loading}>+</button>
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
                <hr />
            </div>
        </>
    )
}

export default CarritoProduct