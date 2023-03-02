// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Toast from 'react-bootstrap/Toast';

// import "./index.css"

// function ToastAlert({ mensaje, estado, color }) {
//     const [showA, setShowA] = useState(estado);


//     useEffect(() => {
//         console.log(mensaje)
//         // setShowA(true)
//         if (mensaje){
//             toggleShowA()
//             setTimeout(() => {
//                 setShowA(false)
//               }, 2000);
//         }
//     })

//     const toggleShowA = () => {
//         setShowA(!showA)
//     };

//     return (
//         <Row className='toast-alert'>
//             <Col md={6} className="mb-2">
//                 <Toast show={showA} bg={`${color}`} onClose={toggleShowA}>
//                     <Toast.Header>
//                         <strong className="me-auto">Notificación</strong>
//                         <small>Ahora</small>
//                     </Toast.Header>
//                     <Toast.Body><strong>{mensaje}</strong></Toast.Body>
//                 </Toast>
//             </Col>
//         </Row>
//     )
// }

// export default ToastAlert