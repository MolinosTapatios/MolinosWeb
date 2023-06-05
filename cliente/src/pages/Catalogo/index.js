import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

import "./index.css"

import TablaPaginacion from 'componentes/TablaPaginacion'
import Modal from 'componentes/ModalEditar'
import { Producto } from "services/producto";
import ToastAlert from 'componentes/ToastAlert';
import ModalConfirmacion from 'pages/ModalConfirmacion';

function Productos() {

    const [showModal, setShowModal] = useState(false)
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false)
    const [id, setId] = useState(0)
    const [toastAlert, setToastAlert] = useState({ msg: null, estado: false, color: null })
    const [productos, setProductos] = useState([])
    const [eliminarConfirm, setEliminar] = useState(false)

    const p = useMemo(() => new Producto({}), [])
    const headers = ["#", "Nombre", "Precio", "Stock", "Estado", "Tipo de Producto", "Acciones"]

    const handleToast = () => {
        setToastAlert({ estado: !toastAlert.estado })
    }

    useEffect(() => {
        p.getProductosCatalogo(p)
            .then(resp => {
                setProductos(resp)
            })
    }, [p])

    useEffect(() => {
        if (eliminarConfirm) {
            p.id = parseInt(id)
            p.removeProduct(p)
                .then(response => {
                    const newData = productos.filter(s => s.id !== id)
                    setProductos(newData)
                    setToastAlert({ msg: response.msg, estado: true, color: 'danger' })
                })
                .catch(error => {
                    setToastAlert({ msg: error, estado: true, color: 'warning' })
                })
        }
        // eslint-disable-next-line
    }, [eliminarConfirm])

    function eliminar(e) {
        handleCloseModalConfirmacion()
        setId(parseInt(e.target.id))
        setEliminar(false)
    }

    const estado = useCallback( () => { setShowModal(!showModal) },[showModal])

    const editar = useCallback((e) => {
        setId(parseInt(e.target.id))
        estado()
    }, [estado])

    const handleCloseModalConfirmacion = () => {
        setShowModalConfirmacion(!showModalConfirmacion)
    }

    return (
        <div className='catalogo-body'>
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
                    className='mb-4 tilte-Catalogo'
                >Gestion de Catálogo</motion.h2>

                <div className='paginacion-tabla'>

                    <div className='col text-end'>
                        <Link to="/registrarPr" className='btn btn-success'>+Nuevo Producto</Link>
                    </div>

                    <TablaPaginacion
                        data={productos}
                        editar={editar}
                        eliminar={eliminar}
                        headers={headers}
                    />
                </div>
                <Modal
                    showModal={showModal}
                    estado={estado}
                    id={id}
                    toastAlert={setToastAlert}
                    setProductos={setProductos}
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
    )
}

export default Productos