import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "./index.css"

import Paginacion from 'componentes/Paginacion'
import Modal from 'componentes/ModalEditar'
import {Producto} from "services/producto";

function Productos() {

    const [render, setRender] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState(0)
    const [toastAlert, setToastAlert] = useState({ msg: null, estado: false, color: null })
    const [productos, setProductos] = useState([])
    
    const headers = ["#", "Nombre", "Precio", "Stock", "Estado", "Tipo de Producto", "Acciones"]
    
    useEffect(() => {
        const p = new Producto({})
        p.getProductosCatalogo(p)
        .then(resp => {
            setProductos(resp)
        })
    }, [render])
    
    function eliminar(e) {
        const p = new Producto({id:parseInt(e.target.id)})
        p.removeProduct(p)
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

                    <Modal showModal={showModal} render={handleRender} id={id} toastAlert={setToastAlert} />

                    {/* <ToastAlert estado={toastAlert.estado} mensaje={toastAlert.msg} color={toastAlert.color} /> */}
                </div>
            </div>
        </div>
    )
}

export default Productos;