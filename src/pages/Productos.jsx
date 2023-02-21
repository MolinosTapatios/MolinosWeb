import { useEffect, useRef, useState } from 'react';
import { Table, Alert } from 'react-bootstrap';
import Modal from '../componentes/ModalEditarProducto'
import getProducts from '../services/getProducts';
import removeProduct from '../services/removeProduct';

function Productos(params) {

    const [MsgAlert, setMsgAlert] = useState(null)
    const [render, setRender] = useState(false)
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState(null)


    useEffect(function () {
        getProducts().then(setLista)
    }, [render])

    function eliminar(e) {
        removeProduct({id : e.target.id})
        .then(response => {
            console.log(response)
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
    }

    //-----------------------------------------------
    //--------------pagination-----------------------
    //-----------------------------------------------
    const [lista, setLista] = useState([])
    const [filas, setFilas] = useState(10)
    const [pagActual, setPagActual] = useState(1)
    const [valor, setValor] = useState("")
    const [pagTotales, setPagTotales] = useState(10)

    const refBusqueda = useRef()
    const refNum_filas = useRef()
    const refTbody = useRef()

    useEffect(() => {
        const array = lista.filter(fila => fila["nombre"].toLowerCase().includes(valor.toLowerCase()))
        const itemsTot = (array.length - (array.length % parseInt(filas))) / parseInt(filas) + (array.length % parseInt(filas) === 0 ? 0 : 1);
        setPagTotales(itemsTot)
    }, [lista, filas, valor])

    const aux = (lista) => {
        lista = lista.filter(fila => fila["nombre"].toLowerCase().includes(valor.toLowerCase()))
        return (lista)
    }

    function Tabla({ lista = [], filas = 5 }) {
        const inicio = (filas * pagActual) - filas;

        lista = aux(lista)
        lista = lista.slice(inicio, inicio + filas)

        return (
            lista.map(p =>
                <FilaProduct key={p.id} p={p} />
            )
        )
    }

    function FilaProduct({ p }) {

        return (
            <tr >
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.precio}</td>
                <td>{p.stock}</td>
                <td>{p.status}</td>
                <td>{p.Tipo_Producto_id}</td>
                <td>
                    <button id={p.id} onClick={eliminar} className='btn btn-danger  mx-2'><i id={p.id} className="bi bi-trash"></i></button>
                    <button id={p.id} onClick={editar} className='btn btn-info mx-2'><i id={p.id} className="bi bi-pencil-square"></i></button>
                </td>
            </tr>
        )
    }

    function changeFilas() {
        setFilas(refNum_filas.current.value)
        setPagActual(1)
    }

    function nextPage() {
        if (pagActual < pagTotales)
            setPagActual(pagActual + 1)
    }

    function prevPage() {
        if (pagActual > 1)
            setPagActual(pagActual - 1)
    }

    function clickItem(e) {
        setPagActual(parseInt(e.target.textContent))
    }

    function Pagination() {
        let items = []
        let flag = false
        const pagAnterior = pagActual - 1
        const pagSiguiente = pagActual + 1
        let countTruncate = 0

        for (let i = 1; i <= pagTotales; i++) {
            if (pagTotales >= 9) {
                if (pagAnterior > 3 && pagSiguiente < pagTotales - 2) {
                    if (i >= pagAnterior && i <= pagSiguiente) {
                        flag = true
                        items.push(<PageItem key={i} pos={i} />)
                    }
                } else {
                    if ((pagActual < 5 && i <= 5) || (pagActual > pagTotales - 5 && i >= pagTotales - 4) || i === pagTotales || i === 1) {
                        items.push(<PageItem key={i} pos={i} />)
                    } else {
                        countTruncate++;
                        if (countTruncate === 1)
                            items.push(<li key={-1} className="page-item"><p className="page-link">...</p></li>)
                    }
                }
            } else {
                items.push(<PageItem key={i} pos={i} />)
            }
        }
        if (flag) {
            items.unshift(<li key={-1} className="page-item"><p className="page-link">...</p></li>)
            items.unshift(<PageItem key={1} pos={1} />)
            items.push(<li key={-2} className="page-item"><p className="page-link">...</p></li>)
            items.push(<PageItem key={pagTotales} pos={pagTotales} />)
        }

        return (items)
    }

    function PageItem({ pos = 0 }) {
        let active = "page-item"
        if (pagActual === pos) {
            active = "page-item active"
        }
        return (
            <li className={active} >
                <p className="page-link btn" onClick={clickItem}>{pos}</p>
            </li>
        )
    }

    function busqueda() {
        setValor(refBusqueda.current.value)
        setPagActual(1)
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
                        <input className="form-control col-1" type="text" ref={refBusqueda} onKeyUp={busqueda} />
                    </div>
                </div>

                <div className="mb-3">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="num_filas">Mostrar  </label>
                            <select name="num_filas" id="num_filas" className="form-select-sm" ref={refNum_filas} onChange={changeFilas} >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select> <label htmlFor="fin">  registros</label>
                        </div>
                        <div className="pagination col">
                            <li className="page-item prev-page" id="prev"><p className="page-link prev-page btn" onClick={prevPage}>Anterior</p></li>
                            <Pagination active={pagActual} />
                            <li className="page-item next-page" id="next"><p className="page-link next-page btn" onClick={nextPage}>Siguiente</p></li>
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
                        <Tabla lista={lista} filas={filas} />
                    </tbody>
                </Table>

                <MODAL estado={false} />
                {/* <Modal showModal={showModal} estado={estado} id={id} /> */}


            </div>
        </div>
    )
}

export default Productos;