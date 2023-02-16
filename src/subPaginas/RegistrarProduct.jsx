import { Form, Row, Col, InputGroup, Button, Alert } from 'react-bootstrap';
import { useRef, useState } from 'react';
import { Registrar } from "../ajaxs/Registro_producto";
// import Registrar from '../ajaxs/Registro_producto';

function RegistrarProduct(params) {
    const refNombre = useRef(null);
    const refPrecio = useRef(null);
    const refStock = useRef(null);
    const refImagen = useRef(null);
    const refDescripcion = useRef(null);
    const refStatus = useRef(null);
    const refTipo = useRef(null);
    const imagen = useRef(null);

    //Validacion de formulario
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [color, setColor] = useState(null);

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

    async function handleRegistro() {
        const data = {
            "nombre": refNombre.current.value,
            "precio": refPrecio.current.value,
            "stock": refStock.current.value,
            "descripcion": refDescripcion.current.value,
            "status": refStatus.current.value,
            "tipo": refTipo.current.value,
        }
        const respuesta = await Registrar(data)
        // console.log(respuesta.flag)
        if (respuesta.flag){
            setColor("info")
            limpiar()
        }
        else
            setColor("danger")
        setError(respuesta.msg)
        setShow(true)
    }
    
    const [file,setFile] = useState(null);
    
    function mostrarImg() {
        setFile(refImagen.current.files[0])
        // console.log(refImagen.current.files[0])
        const img = refImagen.current.files[0]
        const fileReadar = new FileReader();
        fileReadar.readAsDataURL(img)
        fileReadar.onload = function () {
            imagen.current.src = fileReadar.result
            // console.log(fileReadar.result)
        }
    }

    function pruebas() {
        if(!file){
            alert("No hay archivos seleccionados");
            return;
        }
        
        const formdata = new FormData()
        formdata.append('imagen', file)
        
        console.log(formdata);

        fetch("http://localhost/server/guardarImg.php",{
            method:"POST",
            body:formdata
        })
        .then(res => res.text)
        .then(res => console.log(res))
        .catch(err => {
            console.error(err)
        })
        // guardarArchivo()
        // handleRegistro();
    }

    function limpiar(){
        refNombre.current.value = ""
        refPrecio.current.value = ""
        refStock.current.value = ""
        refImagen.current.value = ""
        refDescripcion.current.value = ""
        refStatus.current.value = ""
        refTipo.current.value = ""
        imagen.current.value = ""
    }

    return (
        <div style={{ background: "gray" }}>
            <div className='container py-1' >
                <h1 className='text-center mt-2 mb-5'>Registro de productos</h1>
                {
                    show &&
                    <Alert variant={color} onClose={() => setShow(false)} dismissible>
                        {/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
                        <p>
                            {error}
                        </p>
                    </Alert>
                    //    <Button onClick={() => setShow(true)}>Show Alert</Button>
                }
                {/* {
                    error &&
                    <div className="alert alert-info">
                        {error}
                    </div>
                } */}
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
                                    onChange={mostrarImg}
                                    encType="multipart/form-data"
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
                        </div>

                        <Form.Group as={Col}>
                            <Form.Label>Imagen</Form.Label>
                            <img className='form-control' src="" alt="Imagen" ref={imagen} style={{}} />
                        </Form.Group>
                    </Row>
                    {/* <textarea name="" id="" cols="30" rows="5"></textarea> */}
                    <Button type="submit">Registrar Producto</Button>
                </Form>
                <Button onClick={pruebas}>Registrar Producto</Button>
            </div>
        </div>
    );
}

export default RegistrarProduct;