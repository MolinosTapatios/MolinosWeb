import React, { useState } from "react"
import { useLocation, useParams } from "react-router-dom"

import Carrusel from "componentes/Carrusel"
import { Carrito } from "services/carrito"
import useUser from "hooks/useUser"

import './index.css'
import ToastAlert from "componentes/ToastAlert"

export default function SingleProducto() {

    const { user_id } = useUser()
    const { name } = useParams()
    const { state } = useLocation()
    const [estado, setEstado] = useState({ loading: false, error: false })
    const [toastAlert, setToastAlert] = useState({ color: null, estado: false, msg: null })

    const handleToast = () => {
        setToastAlert({ estado: !toastAlert.estado })
    }

    function addCart() {
        setEstado({ loading: true })
        const c = new Carrito({ usuarioId: user_id })
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
                        <Carrusel images={state.imgs} />
                    </div>
                    <div className="single-product-info col">
                        <h2>{name}</h2>
                        <p className="info-precio">{state.precio}</p>
                        <p className="info-text">Características:</p>
                        <p>{state.caracteristicas}</p>
                        <p className="info-text">Descripción:</p>
                        <p>{state.descripcion}</p>
                        <button className="btn btn-primary" disabled={estado.loading} onClick={addCart} >Agregar a carrito</button>
                    </div>
                </div>
            </div>
        </>
    )
}
