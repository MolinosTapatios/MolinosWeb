import { useEffect, useState } from 'react';
import { Table, Alert } from 'react-bootstrap';

function Productos(params) {

    const [productos, setProductos] = useState([]);
    const [render, setRender] = useState(null);
    const [show, setShow] = useState(false);
    // const [id, setId] = useState(null);

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

    const editar = (e) => {
        console.log(e.target.id)
        const data = {
            "id": e.target.id,
            "nombre": "nombre"
        }

        fetch("http://localhost/server/ajax_editarProducto.php", {
            body: JSON.stringify({ data }),
            method: "POST"
        })
            .then(resp => resp.json())
            .then(response => setRender(response))
    }

    return (
        <div style={{ backgroundColor: "white" }}>
            <div className='container py-3'>
                <h1 className='mb-5'>Todos los productos en linea</h1>

                {
                show &&
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <p>Producto eliminado correctamente</p>
                </Alert>}
                
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
            </div>
        </div>
    )
}

export default Productos;