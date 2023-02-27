import { Form, Row, Col, InputGroup, Button, Alert } from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import Registrar from "services/insetProduct";
import Carrusel from "componentes/Carrusel";

function RegistrarProduct() {

    const refNombre = useRef(null);
    const refPrecio = useRef(null);
    const refStock = useRef(null);
    const refImagen = useRef(null);
    const refDescripcion = useRef(null);
    const refCaracteristicas = useRef(null);
    const refStatus = useRef(null);
    const refTipo = useRef(null);

    //Validacion de formulario
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [color, setColor] = useState(null);
    const [images, setImages] = useState([]);

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

    function handleRegistro() {
        const formdata = new FormData()

        const data = {
            "nombre": refNombre.current.value,
            "precio": refPrecio.current.value,
            "stock": refStock.current.value,
            "descripcion": refDescripcion.current.value,
            "caracteristicas": refCaracteristicas.current.value,
            "status": refStatus.current.value,
            "tipo": refTipo.current.value,
        }

        for (let i = 0; i < refImagen.current.files.length; i++) {
            formdata.append('imagen[]', refImagen.current.files[i])
        }

        formdata.append('producto', JSON.stringify(data))

        Registrar({ formdata: formdata })
            .then(res => {
                if (res.flag) {
                    setColor("info")
                }
                else
                    setColor("danger")
                setError(res.msg)
                setShow(true)
            })
    }

    function mostrarImg() {
        const imgs = [];
        if (refImagen.current.files.length > 0) {
            for (let i = 0; i < refImagen.current.files.length; i++) {
                let img = refImagen.current.files[i]
                let fileReadar = new FileReader();

                fileReadar.readAsDataURL(img)
                fileReadar.onload = () => {
                    imgs.push({
                        "path": fileReadar.result,
                        "id": i
                    })
                    setImages([...imgs])
                }
            }
        } else {
            setImages([])
        }
    }

    function limpiar() {
        refNombre.current.value = null
        refPrecio.current.value = null
        refStock.current.value = null
        refImagen.current.value = null
        refDescripcion.current.value = null
        refCaracteristicas.current.value = null
        refStatus.current.value = ""
        refTipo.current.value = ""
        setValidated(false)
        setImages([])
    }

    return (
        <div style={{ background: "gray" }}>
            <h2 className='text-center pt-2 mb-3'>Registro de productos</h2>
            <div style={{ backgroundColor: "white", borderRadius: "20px", margin: '20px', padding: '25px' }}>
                {
                    show &&
                    <Alert variant={color} onClose={() => setShow(false)} dismissible>
                        <p>
                            {error}
                        </p>
                    </Alert>
                }
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
                            <Form.Control.Feedback type="invalid">Ingresa el stock actual</Form.Control.Feedback>
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
                                    onChange={mostrarImg}
                                    encType="multipart/form-data"
                                    multiple
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    El producto debe tener una imagen
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    placeholder="Descripción"
                                    required
                                    ref={refDescripcion}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingresa una descripción.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Características</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    placeholder="Características"
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
                            {images &&
                                <Carrusel images={images} />
                            }
                        </Form.Group>
                    </Row>

                    <Row className='justify-content-evenly'>
                        <Button className='col-3' onClick={limpiar}>Limpiar Formulario</Button>
                        <Button className='col-3' type="submit">Registrar Producto</Button>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default RegistrarProduct;