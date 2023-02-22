import React from 'react';
import img from 'img/LOGO.png';
import { Nav, Button, Container, Form, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser';

function Menu(params) {

    const {logout,isLogged} = useUser()
    const navigate = useNavigate();

    const handleSalir = () => {
        navigate("/login")
        sessionStorage.removeItem("active")
        logout()
    }

    const icon = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-fill-gear" viewBox="0 0 16 16">
        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
    </svg>;

    return (
        <div style={{ minWidth: "250px" }}>
            <Navbar bg="light" expand="sm">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <img src={img} alt="..." className='imgLogo me-2' />Maquinaria Carbera
                    </Navbar.Brand>
                    <Form className="d-flex col" >
                        <Form.Group className='input-group flex-nowrap' style={{ minWidth: "150px" }}>
                            <Form.Control
                                type="search"
                                placeholder="Buscar..."
                                className="ml-resp-1"
                                aria-label="Search"
                            />
                            <Button variant="outline-success" className='mr-resp-1'>Buscar</Button>
                        </Form.Group>
                        <div className='botones'>
                            {
                                isLogged ?
                                    <NavDropdown title={icon} className="me-2 btn btn-secondary">
                                        <NavDropdown.Item href="#action2">Mi Cuenta</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleSalir}>Salir</NavDropdown.Item>
                                    </NavDropdown>
                                    : <Link className='btn-secondary' to={"/login"} style={{ width: "150px", cursor: "pointer" }}>Iniciar Sesion</Link>
                            }
                            <Button className='btn btn-secondary'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                </svg>
                            </Button>
                        </div>
                    </Form>
                </Container>
            </Navbar>
            <Navbar bg="light" expand="sm">
                <Container className='text-center'>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='row justify-content-center'>
                        <Nav className="col-md-auto">
                            <Link className='nav-link' to="/">Inicio</Link>
                            {/* <Nav.Link href="/">Inicio</Nav.Link> */}
                            <NavDropdown title="Molinos" id="navbarScrollingDropdown">
                                <Link className='dropdown-item' to="/">Molinos de Discos</Link>
                                <NavDropdown.Divider />
                                <Link className='dropdown-item' to="/">Molinos de Piedras</Link>
                            </NavDropdown>
                            <Link className='nav-link' to="/tortilla">Tortilladoras</Link>
                            <NavDropdown title="Inventario" id="navbarScrollingDropdown">
                                <Link className='dropdown-item' to="/todos_productos">Todos los productos</Link>
                                <NavDropdown.Divider />
                                <Link className='dropdown-item' to="registrarPr">Registrar Producto</Link>
                            </NavDropdown>

                            <Link className='nav-link add' to="#action2">Carrito</Link>
                            <Link className='nav-link add' to="#action2">Mi Cuenta</Link>
                            <Link className='nav-link add' to="/" onClick={() => { sessionStorage.removeItem("active") }}>Salir</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Menu;