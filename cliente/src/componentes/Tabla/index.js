import React from 'react';
import { Table } from 'react-bootstrap';

function Headers({ headers = [] }) {
    return (
        <>
            {
                headers.map(header =>
                    <th key={header}>{header}</th>
                )
            }
        </>
    )
}


function Tabla({ headers, lista, editar, eliminar } = {}) {

    function Body({ data = [] } = {}) {
        return (
            <>
                {
                    data.map(fila =>
                        <FilaProduct key={fila.id} p={fila} />
                    )
                }
            </>
        )
    }

    function FilaProduct({ p }) {

        const precio = parseInt(p.precio).toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        })

        return (
            <tr id={`fila${p.id}`} >
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{precio}</td>
                <td>{p.stock}</td>
                <td>{parseInt(p.status) === 1 ? "Visible" : "Oculto"}</td>
                <td>{p.tipo}</td>
                <td>
                    <button id={p.id} onClick={eliminar} className='btn btn-danger  mx-2'><i id={p.id} className="bi bi-trash"></i></button>
                    <button id={p.id} onClick={editar} className='btn btn-info mx-2'><i id={p.id} className="bi bi-pencil-square"></i></button>
                </td>
            </tr>
        )
    }


    return (
        <>
            <Table striped bordered hover size="sm" >
                <thead className='text-center'>
                    <tr>
                        <Headers headers={headers} />
                    </tr>
                </thead>
                <tbody className='text-center'>
                    <Body data={lista} />
                </tbody>
            </Table>
        </>
    )
}

export default Tabla