import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { motion } from 'framer-motion'

import './index.css'

function Almacen() {
    return (
        <>
            <div className='body-almacen'>
                <motion.h2
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: 2,
                        type: "spring"
                    }}
                    className='mb-4 title-almacen'
                >Gestion de Almacen</motion.h2>
                <Row className='row-almacen'>
                    <Col className='col-almacen'>
                        <Row>
                            <h3>Registro de Entradas</h3>
                            <Col>
                                <p>Filtrar por:</p>
                            </Col>
                            <Col>
                                <button className='btn btn-entrada'>+Entrada</button>
                            </Col>
                        </Row>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>3/6/2023</td>
                                    <td>DADO DE 17mm x 1/2"</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>3/6/2023</td>
                                    <td>DADO DE 17mm x 1/2"</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>3/6/2023</td>
                                    <td>DADO DE 17mm x 1/2"</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>3/6/2023</td>
                                    <td>DADO DE 17mm x 1/2"</td>
                                    <td>5</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col className='col-almacen'>
                        <Row>
                            <h3>Registro de Salidas</h3>
                            <Col>
                                <p>Filtrar por:</p>
                            </Col>
                            <Col>
                                <button className='btn btn-success'>+Salida</button>
                            </Col>
                        </Row>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>3/6/2023</td>
                                    <td>DADO DE 17mm x 1/2"</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>3/6/2023</td>
                                    <td>DADO DE 17mm x 1/2"</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>3/6/2023</td>
                                    <td>DADO DE 17mm x 1/2"</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>3/6/2023</td>
                                    <td>DADO DE 17mm x 1/2"</td>
                                    <td>5</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Almacen