import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { useState } from 'react';

function RegistrarProduct(params) {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <div className='container pt-5' style={{ background: "white" }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">

                    <Form.Group as={Col}>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre"
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
                            required />
                        <Form.Control.Feedback type="invalid">Ingresa el stoc actual</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">

                    <Form.Group  controlId="formFile" className="mb-3">
                        <Form.Label>Selecciona una imagen</Form.Label>
                        <Form.Control type="file" accept='.png, .jpg' required/>
                        <Form.Control.Feedback type="invalid">
                            El producto debe tener una imagen
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control as="textarea" type="text" placeholder="Descripcion" required />
                        <Form.Control.Feedback type="invalid">
                            Ingresa una descripción.
                        </Form.Control.Feedback>
                    </Form.Group>
                    {/* <textarea name="" id="" cols="30" rows="5"></textarea> */}
                </Row>
                <Button type="submit">Registrar Producto</Button>
            </Form>
        </div>
    );
}

export default RegistrarProduct;