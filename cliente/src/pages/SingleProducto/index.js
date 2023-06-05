import React, { useState, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"

import Carrusel from "componentes/Carrusel"
import ToastAlert from "componentes/ToastAlert"
import { URL } from "services/config"
import { Carrito } from "services/carrito"
import { Producto } from "services/producto"
import useUser from "hooks/useUser"

import './index.css'

export default function SingleProducto() {

    const { user } = useUser()
    const { name } = useParams()
    const { state } = useLocation()
    const [estado, setEstado] = useState({ loading: false, error: false })
    const [toastAlert, setToastAlert] = useState({ color: null, estado: false, msg: null })
    const [p, setProducto] = useState(new Producto({ imagenes: [] }))

    const handleToast = () => {
        setToastAlert({ estado: !toastAlert.estado })
    }

    function addCart() {
        setEstado({ loading: true })
        const c = new Carrito({ usuarioId: user.id })
        c.addCarrito({ cantidad: 1, idProducto: state.id, mantener: true, carrito: c })
            .then(resp => {
                setEstado({ loading: false })
                if (resp.flag) {
                    setToastAlert({ color: "info", estado: true, msg: resp.msg })
                } else {
                    setEstado({ error: true })
                    setToastAlert({ color: "danger", estado: true, msg: "Error" })
                }
            })
            .catch((e) => {
                setToastAlert({ color: "danger", estado: true, msg: e })
                setEstado({ error: true, loading: false })
            })
    }

    useEffect(() => {
        if (state.state) {
            p.id = state.id 
            p.getSingleProduct(p)
                .then(response => {
                    if (!response.error) {
                        if (response.imagenes) {
                            response.imagenes.map(i => {
                                i.path = URL + '/' + i.path
                                return i
                            })
                        }
                        setProducto({
                            caracteristicas: response.caracteristicas,
                            descripcion: response.descripcion,
                            precio: state.precio,
                            imagenes: response.imagenes
                        })
                    }
                })
                .catch()
        } else {
            setProducto({
                caracteristicas: state.caracteristicas,
                descripcion: state.descripcion,
                precio: state.precio,
                imagenes: state.imgs
            })
        }
        // eslint-disable-next-line
    }, [state])

    return (
        <>
            <ToastAlert
                color={toastAlert.color}
                estado={toastAlert.estado}
                mensaje={toastAlert.msg}
                handleEstado={handleToast}
            />
            <div className="contenedor">
                <div className="single-product row">
                    <div className="single-product-image col" >
                        <Carrusel images={p.imagenes} />
                    </div>
                    <div className="single-product-info col">
                        <h2>{name}</h2>
                        <p className="info-precio">{p.precio}</p>
                        <p className="info-text">Características:</p>
                        <p>{p.caracteristicas}</p>
                        <p className="info-text">Descripción:</p>
                        <p>{p.descripcion}</p>
                        <button className="btn btn-primary" disabled={estado.loading} onClick={addCart} >Agregar a carrito</button>
                    </div>
                </div>
            </div>
        </>
    )
}
