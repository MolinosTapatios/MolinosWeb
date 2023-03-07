import React, { useState, useEffect, useRef } from "react";
import './index.css'
import Tabla from "componentes/Tabla";

function Paginacion({ headers, data = [], editar, eliminar }) {

    const refNum_filas = useRef()
    const refBusqueda = useRef()

    const [datos, setDatos] = useState([]);
    const [filas, setFilas] = useState(10)
    const [valor, setValor] = useState("")
    const [pagActual, setPagActual] = useState(1)
    const [pagTotales, setPagTotales] = useState(10)
    //se renderiza cada vez que cambian los valores
    useEffect(() => {
        const dataFiltro = data.filter(fila => fila["nombre"].toLowerCase().includes(valor.toLowerCase()))
        const itemsTot = (dataFiltro.length - (dataFiltro.length % parseInt(filas))) / parseInt(filas) + (dataFiltro.length % parseInt(filas) === 0 ? 0 : 1)
        setPagTotales(itemsTot)
        setDatos(dataFiltro.slice(((pagActual * filas) - filas), (filas * pagActual)))
    }, [data, filas, valor, pagActual])
    //cada que cambia la cantidad de filas
    function changeFilas() {
        setPagActual(1)
        setFilas(refNum_filas.current.value)
    }
    //busqueda cada vez que presiona una tecla
    function onKeyUpBusqueda() {
        setPagActual(1)
        setValor(refBusqueda.current.value)
    }
    //pagina anterior
    function prevPage() {
        if (pagActual > 1)
            setPagActual(pagActual - 1)
    }
    //pagina Siguiente
    function nextPage() {
        if (pagActual < pagTotales)
            setPagActual(pagActual + 1)
    }
    //cada que se da click en un item
    function clickItem(e) {
        setPagActual(parseInt(e.target.textContent))
    }
    //renderizacon de cada item en de paginas
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
    //paginacion
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

    return (
        <>
            <hr className="solid"></hr>
            <div className='row mb-3'>
                <div className='input-group flex-nowrap'>
                    <label className="input-group-text">Búsqueda:</label>
                    <input className="form-control col-1" type="text" ref={refBusqueda} onKeyUp={onKeyUpBusqueda} />
                </div>
            </div>
            <div className="row my-4 justify-content-center">

                <div className="col input-filas">
                    <div className="align-self-center">
                        <label htmlFor="num_filas">Mostrar  </label>
                        <select name="num_filas" id="num_filas" className="form-select-sm" ref={refNum_filas} onChange={changeFilas} >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select> <label htmlFor="fin">  registros</label>
                    </div>
                </div>

                <div className="pagination col">
                    <li className="page-item prev-page" id="prev"><p className="page-link prev-page btn" onClick={prevPage}>{'<<'}</p></li>
                    <Pagination active={pagActual} />
                    <li className="page-item next-page" id="next"><p className="page-link next-page btn" onClick={nextPage}>{'>>'}</p></li>
                </div>

            </div>
            <div className="tabla-container">
                <Tabla headers={headers} lista={datos} editar={editar} eliminar={eliminar} />
            </div>
        </>
    )
}

export default Paginacion