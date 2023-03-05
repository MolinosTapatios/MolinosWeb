import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

import "./index.css"

function ToastAlert({ mensaje, estado, color, handleEstado}) {

    useEffect(()=>{
        if(estado){
            setTimeout(handleEstado,2000)
        }
    // eslint-disable-next-line
    }, [estado])

    return (
        <Row className='toast-alert'>
            <Col md={6} className="mb-2">
                <Toast show={estado} bg={`${color}`} onClose={handleEstado}>
                    <Toast.Header>
                        <strong className="me-auto">Notificación</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body><strong>{mensaje}</strong></Toast.Body>
                </Toast>
            </Col>
        </Row>
    )
}

export default ToastAlert