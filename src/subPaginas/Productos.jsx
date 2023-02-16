import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

function Productos(params) {

    const [productos,setProductos] = useState([]);

    useEffect(function () {
        console.log("xd")
        fetch("http://localhost/server/ajaxProductos.php")
        .then(res => res.json())
        .then(response =>{
            const data = response
            const productos = data;
            // console.log(productos)
            setProductos(productos);
        })
    }, [])


    return (
        <div style={{backgroundColor:"white"}}>
            <div className='container py-3'>
                <h1 className='mb-5'>Todos los productos en linea</h1>
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
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
                                    <th>{p.descripcion}</th>
                                    <th>{p.precio}</th>
                                    <th>{p.stock}</th>
                                    <th>{p.status}</th>
                                    <th>{p.Tipo_Producto_id}</th>
                                    <th>
                                        <button id={p.id} className='btn btn-danger mx-2'><i className="bi bi-trash"></i></button>
                                        <button id={p.id} className='btn btn-info mx-2'><i className="bi bi-pencil-square"></i>    </button>
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