import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

import "./index.css"

import TablaPaginacion from 'componentes/TablaPaginacion'
import Modal from 'componentes/ModalEditar'
import { Producto } from "services/producto";
import ToastAlert from 'componentes/ToastAlert';
import ModalConfirmacion from 'pages/ModalConfirmacion';

function Productos() {

    const [render, setRender] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false)
    const [id, setId] = useState(0)
    const [toastAlert, setToastAlert] = useState({ msg: null, estado: false, color: null })
    const [productos, setProductos] = useState([])
    const [eliminarConfirm, setEliminar] = useState(false);

    const headers = ["#", "Nombre", "Precio", "Stock", "Estado", "Tipo de Producto", "Acciones"]

    const handleToast = () => {
        setToastAlert({ estado: !toastAlert.estado })
    }

    useEffect(() => {
        const p = new Producto({})
        p.getProductosCatalogo(p)
            .then(resp => {
                setProductos(resp)
            })
    }, [render])

    useEffect(() => {
        if (eliminarConfirm) {
            const p = new Producto({ id: parseInt(id) })
            p.removeProduct(p)
                .then(response => {
                    setToastAlert({ msg: response.msg, estado: true, color: 'danger' })
                    setRender(!render)
                })
        }
    // eslint-disable-next-line
    }, [eliminarConfirm])

    function eliminar(e) {
        handleCloseModalConfirmacion()
        setId(parseInt(e.target.id))
        setEliminar(false)
    }

    const handleRender = () => setRender(!render)

    const estado = () => { setShowModal(!showModal) }

    const editar = (e) => {
        setId(e.target.id)
        estado()
    }

    const handleCloseModalConfirmacion = () => {
        setShowModalConfirmacion(!showModalConfirmacion)
    }

    return (
        <div style={{ backgroundColor: "gray" }}>
            <ToastAlert
                color={toastAlert.color}
                estado={toastAlert.estado}
                mensaje={toastAlert.msg}
                handleEstado={handleToast}
            />
            <div className='p-4 py-4'>
                <motion.h2
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: 2,
                        type: "spring"
                    }}
                    className='mb-4'
                >Gestion de Catálogo</motion.h2>

                <div className='contenedor-tabla'>

                    <div className='col text-end'>
                        <Link to="/registrarPr" className='btn btn-success'>+Nuevo Producto</Link>
                    </div>

                    <TablaPaginacion
                        data={productos}
                        editar={editar}
                        eliminar={eliminar}
                        headers={headers}
                    />
                    <Modal
                        showModal={showModal}
                        estado = {estado}
                        render={handleRender}
                        id={id}
                        toastAlert={setToastAlert}
                    />
                    <ModalConfirmacion
                        show={showModalConfirmacion}
                        body={"¿Esta seguro que desea elimiar el producto?"}
                        title={"Eliminar Producto"}
                        handleClose={handleCloseModalConfirmacion}
                        respuesta={setEliminar}
                    />
                </div>
            </div>
        </div>
    )
}

export default Productos