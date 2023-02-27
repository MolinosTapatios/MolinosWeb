import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "./index.css"

import Paginacion from 'componentes/Paginacion'
import Modal from 'componentes/ModalEditar'
import removeProduct from 'services/removeProduct';
import ToastAlert from 'componentes/Toast';
import getProducts from "services/getProducts";

function Productos() {

    const [render, setRender] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState(0)
    const [toastAlert, setToastAlert] = useState({ msg: null, estado: false, color: null })
    const [productos, setProductos] = useState([])

    const headers = ["#", "Nombre", "Precio", "Stock", "Estado", "Tipo de Producto", "Acciones"]

    useEffect(() => {
        getProducts({limit:-1,tipo:-1,status:-1})
        .then(resp => {
            setProductos(resp)
        })
    }, [render])

    function eliminar(e) {
        removeProduct({ id: e.target.id })
            .then(response => {
                console.log(response)
                setToastAlert({ msg: response.msg, estado: !toastAlert.estado, color: 'danger' })
                setRender(!render)
            })
    }

    const handleRender = () => setRender(!render)

    const estado = () => { setShowModal(!showModal) }

    const editar = (e) => {
        setId(e.target.id)
        estado()
    }

    return (
        <div style={{ backgroundColor: "gray" }}>
            <div className='p-4 py-4'>
                <h2 className='mb-4'>Gestion de Catálogo</h2>

                <div className='contenedor-tabla'>

                    <div className='col text-end'>
                        <Link to="/registrarPr" className='btn btn-success'>+Nuevo Producto</Link>
                    </div>

                    <Paginacion
                        data={productos}
                        editar={editar}
                        eliminar={eliminar}
                        headers={headers} />

                    {/* <MODAL estado={false} /> */}
                    <Modal showModal={showModal} render={handleRender} id={id} toastAlert={setToastAlert} />

                    <ToastAlert estado={toastAlert.estado} mensaje={toastAlert.msg} color={toastAlert.color} />
                </div>
            </div>
        </div>
    )
}

export default Productos;