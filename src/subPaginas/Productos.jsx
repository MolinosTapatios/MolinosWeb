import { useEffect, useState } from 'react';
import { Table, Alert } from 'react-bootstrap';
import Modal from '../componentes/ModalEditarProducto'

function Productos(params) {

    const [productos, setProductos] = useState([]);
    const [render, setRender] = useState(null);
    const [show, setShow] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [id,setId] = useState(null);

    useEffect(function () {
        fetch("http://localhost/server/ajaxProductos.php")
            .then(res => res.json())
            .then(response => {
                const data = response
                const productos = data;
                // console.log(productos)
                setProductos(productos);
            })
    }, [render])

    function eliminar(e) {
        // console.log(e.target.id)
        fetch("http://localhost/server/ajax_eliminarProducto.php", {
            body: JSON.stringify({ "id": e.target.id }),
            method: "POST"
        })
            .then(resp => resp.json())
            .then(response => {
                setRender(response)
                setShow(true)
            })
    }

    const estado =(estado)=>{
        setShowModal(estado)
        return estado;
    }

    const MODAL =()=> <Modal showModal={showModal} estado ={estado}  id={id}/>;

    const editar = (e) => {
        setId(e.target.id)
        estado(true)
        console.log(e.target.id)
    }

    return (
        <div style={{ backgroundColor: "white" }}>
            <div className='container py-3'>
                <h1 className='mb-5'>Todos los productos en linea</h1>

                {
                    show &&
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        <p>Producto eliminado correctamente</p>
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
                            <select name="num_filas" id="num_filas" className="form-select-sm">
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
                    <tbody className='text-center'>
                        {
                            productos.map(p =>
                                <tr key={p.id}>
                                    <th>{p.id}</th>
                                    <th>{p.nombre}</th>
                                    <th>{p.precio}</th>
                                    <th>{p.stock}</th>
                                    <th>{p.status}</th>
                                    <th>{p.Tipo_Producto_id}</th>
                                    <th>
                                        <button id={p.id} onClick={eliminar} className='btn btn-danger  mx-2'><i id={p.id} className="bi bi-trash"></i></button>
                                        <button id={p.id} onClick={editar} className='btn btn-info mx-2'><i id={p.id} className="bi bi-pencil-square"></i></button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>

                <MODAL estado = {false} />

                
            </div>
        </div>
    )
}

export default Productos;