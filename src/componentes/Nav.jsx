import React,{useState} from 'react';
import { Nav, Button, Container, Form, Navbar, NavDropdown } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import Chats from './Chats';
// import Sonnet from '../../components/Sonnet';

function Menu(params) {
    const [key, setKey] = useState('home');

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">Link</Nav.Link>
                            <NavDropdown title="Link" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#" disabled>
                                Link
                            </Nav.Link>
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

            {/* <Container className='py-4'>
                <Row className='justify-content-center'>
                    <Tabs justify variant="pills" defaultActiveKey="tab-1" className="mb-1 p-0">
                        <Tab eventKey="tab-1" title="Tab 1">
                            ......1
                        </Tab>
                        <Tab eventKey="tab-2" title="Tab 2">
                            ......2
                        </Tab>
                        <Tab eventKey="tab-3" title="Tab 3">
                            ......3
                        </Tab>
                    </Tabs>
                </Row>
            </Container> */}

            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="home" title="Inicio">
                    {/* <Sonnet /> */}
                    <Chats/>
                </Tab>
                <Tab eventKey="profile" title="Chats">
                    {/* <Sonnet /> */}
                    profile
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    {/* <Sonnet /> */}
                </Tab>
            </Tabs>
        </div>
    );
}

export default Menu;