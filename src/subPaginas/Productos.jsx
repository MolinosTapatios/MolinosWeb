import { useEffect, useReducer, useRef, useState } from 'react';
import { Table, Alert } from 'react-bootstrap';
import Modal from '../componentes/ModalEditarProducto'

function FilaProduct({p}) {

    return (
        <tr >
            <td>{p.id}</td>
            <td>{p.nombre}</td>
        </tr>
    )
}

function Productos(params) {

    const [MsgAlert, setMsgAlert] = useState(null)
    const [productos, setProductos] = useState([])
    const [render, setRender] = useState(false)
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState(null)
    const [lista, setLista] = useState([])

    
    useEffect(function () {
        fetch("http://localhost/server/ajaxProductos.php")
        .then(res => res.json())
        .then(response => {
            const data = response
            const productos = data
            setProductos(productos)
            setLista(productos)
        })
    }, [render])

    function eliminar(e) {
        fetch("http://localhost/server/ajax_eliminarProducto.php", {
            body: JSON.stringify({ "id": e.target.id }),
            method: "POST"
        })
            .then(resp => resp.json())
            .then(response => {
                setRender(!render)
                setShow(true)
                setMsgAlert(response.msg)
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
        setId(e.target.id)
        estado(true)
        // console.log(e.target.id)
    }

    //-----------------------------------------------
    //--------------pagination-----------------------
    //-----------------------------------------------
    const refNum_filas = useRef()
    const refTbody = useRef()

    function Tabla({lista=[]}) {
        if(!!refNum_filas.current){
            lista = lista.slice(0,refNum_filas.current.value) 
        }

        return(
            lista.map(p =>
                <FilaProduct key={p.id} p={p} />
            )
        )
    }

    return (
        <div style={{ backgroundColor: "white" }}>
            <div className='container py-3'>
                <h1 className='mb-5'>Todos los productos en linea</h1>

                {
                    show &&
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        <p>{MsgAlert}</p>
                    </Alert>
                }

                <div className='row col-5 mb-3'>
                    <div className='input-group flex-nowrap'>
                        <label className="input-group-text">Busqueda:</label>
                        <input className="form-control col-1" type="text" id="busqueda" />
                    </div>
                </div>

                <div className="mb-3">
                    <div className="row">
                        <div className="col-md-4 btn-toolbar align-items-center">
                            <label htmlFor="num_filas">Mostrar  </label>
                            <select name="num_filas" id="num_filas" className="form-select-sm" ref={refNum_filas} /* onChange={cambio} */ >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select> <label htmlFor="fin">  registros</label>
                        </div>
                        <div className="col-md-4 offset-md-4 ">
                            <div aria-label="Page navigation example " className="col-auto">
                                <ul className="pagination justify-content-end" id="pagination">
                                    <li className="page-item prev-page" id="prev"><p className="page-link prev-page btn">Anterior</p></li>
                                    <li className="page-item active"><p className="page-link btn" data-page="1">1</p></li>
                                    <li className="page-item next-page" id="next"><p className="page-link next-page btn">Siguiente</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <Table striped bordered hover size="sm" >
                    <thead className='text-center'>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Tipo de Producto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className='text-center' ref={refTbody} id="cuerpo">
                        
                            <Tabla lista={lista} filas={10} />
                        
                        {
                            // productos.map(p =>
                            // <tr key={p.id}>
                            //     <td>{p.id}</td>
                            //     <td>{p.nombre}</td>
                            //     <td>{p.precio}</td>
                            //     <td>{p.stock}</td>
                            //     <td>{p.status}</td>
                            //     <td>{p.Tipo_Producto_id}</td>
                            //     <td>
                            //         <button id={p.id} onClick={eliminar} className='btn btn-danger  mx-2'><i id={p.id} className="bi bi-trash"></i></button>
                            //         <button id={p.id} onClick={editar} className='btn btn-info mx-2'><i id={p.id} className="bi bi-pencil-square"></i></button>
                            //     </td>
                            // </tr>
                            // )
                        }
                    </tbody>
                </Table>

                <MODAL estado={false} />


            </div>
        </div>
    )
}

export default Productos;