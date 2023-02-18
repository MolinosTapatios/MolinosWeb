import { useState, useRef, useEffect } from "react";
// import { useEffect } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";

function ModalEditar({ showModal=false, estado, id=0 }) {
    
    console.log(id);

    const refNombre = useRef(null);
    const refPrecio = useRef(null);
    const refStock = useRef(null);
    const refImagen = useRef(null);
    const refDescripcion = useRef(null);
    const refCaracteristicas = useRef(null);
    const refStatus = useRef(null);
    const refTipo = useRef(null);
    const imagen = useRef(null);

    const [validated, setValidated] = useState(false);
    const [show, setShowModal] = useState(showModal);

    useEffect(()=>{
        fetch("http://localhost/server/ajax_getProducto.php", {
            body: JSON.stringify({"id":0}),
            method: "POST"
        })
        .then(resp => resp.json())
        .then(response => console.log(response))
    },[])

    // const handleShowModal = () => (setShowModal(true));
    const handleCloseModal = () => {
        estado(false)
        setShowModal(false)
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            handleRegistro();
        }
        setValidated(true);
    };

    function mostrarImg() {
        // setFile(refImagen.current.files[0])
        // console.log(refImagen.current.files[0])
        const img = refImagen.current.files[0]
        const fileReadar = new FileReader();
        fileReadar.readAsDataURL(img)
        fileReadar.onload = function () {
            imagen.current.src = fileReadar.result
            // console.log(fileReadar.result)
        }
    }

    async function handleRegistro() {
        // const data = {
        //     "nombre": refNombre.current.value,
        //     "precio": refPrecio.current.value,
        //     "stock": refStock.current.value,
        //     "descripcion": refDescripcion.current.value,
        //     "caracteristicas" : refCaracteristicas.current.value,
        //     "status": refStatus.current.value,
        //     "tipo": refTipo.current.value,
        // }
        // const respuesta = await Registrar(data)
        // console.log(respuesta.flag)
        // if (respuesta.flag){
            // setColor("info")
        // }
        // else
        // setColor("danger")
        // setError(respuesta.msg)
        // setShow(true)
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">

                        <Form.Group as={Col} className="">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                ref={refNombre}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Ingresa el nombre del producto.</Form.Control.Feedback>
                            <Form.Control.Feedback>Muy bien!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="">
                            <Form.Label>Precio</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text >$</InputGroup.Text>
                                <Form.Control
                                    step="0.01"
                                    type="number"
                                    placeholder="$...."
                                    ref={refPrecio}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingresa el precio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                placeholder='Stock'
                                ref={refStock}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Ingresa el stoc actual</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className='mb-3'>
                        <Form.Group className='' as={Col}>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select ref={refTipo} required >
                                <option defaultValue value="">Selecciona un tipo...</option>
                                <option value="1">Molino</option>
                                <option value="2">Tortilladora</option>
                                <option value="3">Mezcladora</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Selecciona el tipo del producto</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Estado</Form.Label>
                            <Form.Select ref={refStatus} required >
                                <option defaultValue value="" >Selecciona el estado...</option>
                                <option value="0" >Oculto</option>
                                <option value="1" >Visible</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Seleciona el estado para el producto</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <div className='col'>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Selecciona una imagen</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept='.png, .jpg'
                                    ref={refImagen}
                                    encType="multipart/form-data"
                                    onChange={mostrarImg}
                                // required
                                />
                                <Form.Control.Feedback type="invalid">
                                    El producto debe tener una imagen
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    placeholder="Descripcion"
                                    required
                                    ref={refDescripcion}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingresa una descripción.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Caracteristicas</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    placeholder="Caracteristicas"
                                    required
                                    ref={refCaracteristicas}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingresa una Caracteristicas.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <Form.Group as={Col}>
                            <Form.Label>Imagen</Form.Label>
                            <img className='form-control' src="" alt="Imagen" ref={imagen} style={{}} />
                        </Form.Group>
                    </Row>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary">Guardar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditar;