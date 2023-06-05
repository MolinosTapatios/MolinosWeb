import React, { useCallback } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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

        const navigate = useNavigate()

        const precio = parseInt(p.precio).toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        })

        const redirection = useCallback((e) => {
            const target = e.target

            if (target.tagName === 'BUTTON' || target.tagName=== 'I' || target.parentElement.classList.contains('last-colum')) {
                return
            }

            navigate(`/detalles/${p.nombre}`, {
                state: {
                    state: true,
                    imgs: p.images,
                    id: p.id,
                    descripcion: p.descripcion,
                    precio: precio,
                    caracteristicas: p.caracteristicas
                }
            })
            // eslint-disable-next-line
        }, [navigate])

        return (
            <tr id={`fila${p.id}`} onClick={redirection} >
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{precio}</td>
                <td>{p.stock}</td>
                <td>{parseInt(p.status.data[0]) === 1 ? "Visible" : "Oculto"}</td>
                <td>{p.nombre_tipo}</td>
                <td className='last-colum'>
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