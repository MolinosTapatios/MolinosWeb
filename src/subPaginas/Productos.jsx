import Table from 'react-bootstrap/Table';

function Productos(params) {

    const productos = [{"nombre":"Molino"}];

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
                    <tbody>
                        {
                            productos.map(p => 
                                <tr key={p.nombre}>
                                    <th>1</th>
                                    <th>{p.nombre}</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
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