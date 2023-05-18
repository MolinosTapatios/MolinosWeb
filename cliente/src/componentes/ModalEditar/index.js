import { useState, useRef, useEffect } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import Carrusel from 'componentes/Carrusel';

import './index.css'

import { Producto } from "services/producto";
import deleteImg from "services/deleteImg";

function ModalEditar({ id = 0, showModal, estado, render, toastAlert }) {

    const refTitleModal = useRef(null);
    const refNombre = useRef(null);
    const refPrecio = useRef(null);
    const refStock = useRef(null);
    const refImagen = useRef(null);
    const refDescripcion = useRef(null);
    const refCaracteristicas = useRef(null);
    const refStatus = useRef(null);
    const refTipo = useRef(null);

    const [validated, setValidated] = useState(false);
    const [images, setImages] = useState([]);
    
    //get de info del producto
    useEffect(() => {
        if(showModal ){
            const p = new Producto({id: id});
            p.getSingleProduct(p)
                .then(response => {
                    if (!response.msg) {
                            refTitleModal.current.innerHTML = response.nombre
                            refNombre.current.value = response.nombre
                            refTipo.current.value = response.Tipo_Producto_id
                            refStatus.current.value = response.status.data[0]
                            refCaracteristicas.current.value = response.caracteristicas
                            refDescripcion.current.value = response.descripcion
                            refPrecio.current.value = response.precio
                            refStock.current.value = response.stock
                            if (response.imagenes) {
                                setImages(response.imagenes)
                            }
                        }
                    })
        }
    }, [id,showModal])

    const handleCloseModal = () => {
        setImages([])
        estado()
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

    //actualizacion del producto
    function handleRegistro() {
        const formdata = new FormData()

        const data = {
            "id": id,
            "nombre": refNombre.current.value,
            "precio": refPrecio.current.value,
            "stock": refStock.current.value,
            "descripcion": refDescripcion.current.value,
            "caracteristicas": refCaracteristicas.current.value,
            "status": refStatus.current.value,
            "tipo": refTipo.current.value,
        }
        for (let i = 0; i < refImagen.current.files.length; i++) {
            formdata.append('images', refImagen.current.files[i])
        }

        formdata.append('producto', JSON.stringify(data))

        const p = new Producto({})
        p.updateProduct({formdata:formdata })
            .then(resp => {
                setImages([])
                setValidated(false)
                if (resp.error) {
                    toastAlert({msg:resp.error,estado:true, color:'warning'})
                }else{
                    toastAlert({msg:resp.msg,estado:true, color:'info'})
                }
            })
        estado()
    }

    useEffect(()=>{
        
    })
    
    const deleteImage=()=>{
        const imgs = document.getElementById('carrusel').childNodes[1]
        for (let i = 0; i < imgs.childNodes.length; i++) {
            if(imgs.childNodes[i].classList.length > 1){
                deleteImg({id:parseInt(imgs[i].childNodes[0].id)})
                .then(resp => console(resp))
                imgs.childNodes[i].style.display = 'none'
                console.log(imgs.childNodes[0])
            }
        }
    }

    return (
        <>
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title ref={refTitleModal}></Modal.Title>
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
                                        onChange={mostrarImg}
                                        encType="multipart/form-data"
                                        multiple
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
                                        ref={refCaracteristicas}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingresa una Caracteristicas.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>

                            <Form.Group as={Col}>
                                <Form.Label>Imagen</Form.Label>
                                <Carrusel images={images} deleteImg={deleteImage} />
                                {
                                    images.length !== 0 &&
                                <span><i className="bi bi-trash btn btn-danger delete" onClick={deleteImage}></i></span>
                                }
                            </Form.Group>
                        </Row>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">Guardar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalEditar;