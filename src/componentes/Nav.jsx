// import React,{useState} from 'react';
import { Nav, Button, Container, Form, Navbar, NavDropdown } from 'react-bootstrap';

function Menu(params) {
    // const [key, setKey] = useState('home');

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Maquinaria Carbera</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="#action1">Inicio</Nav.Link>
                            {/* <Nav.Link href="#action2">Molinos</Nav.Link> */}
                            <NavDropdown title="Molinos" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action2">Molinos de discos</NavDropdown.Item>
                                <NavDropdown.Item href="#action3">Molinos de piedras</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {/* <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item> */}
                            </NavDropdown>
                            <Nav.Link href="#action4">Tortilladoras</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Menu;