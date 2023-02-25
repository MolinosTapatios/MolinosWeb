import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "./index.css"

import Paginacion from 'componentes/Paginacion'
import Modal from 'componentes/ModalEditar'
import inputImages from 'services/inputImages';
import removeProduct from 'services/removeProduct';
import useProducts from 'hooks/useProducts';


function Productos() {

    const [render, setRender] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState(0)
    const {productos, tipoProductos} = useProducts()

    const headers = ["#", "Nombre", "Precio", "Stock", "Estado", "Tipo de Producto", "Acciones"]

    useEffect(function () {
        tipoProductos({tipo:-1,limit:0})
    }, [ tipoProductos])

    function eliminar(e) {
        removeProduct({ id: e.target.id })
            .then(response => {
                setRender(!render)
            })
    }

    const estado = (estado) => {
        setShowModal(estado)
        if (showModal === true) {
            setRender(!render)
        }
    }

    const MODAL = () => <Modal showModal={showModal} estado={estado} id={id} />;

    const editar = (e) => {
        inputImages()
        setId(e.target.id)
        estado(true)
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


                    <MODAL estado={false} />
                </div>
            </div>

        </div>
    )
}

export default Productos;