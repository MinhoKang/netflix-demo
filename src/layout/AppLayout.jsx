import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet } from 'react-router-dom';
import netflixLogo from '../image/netflix-logo.png';

const AppLayout = () => {
  return (
    <div>
      <Navbar expand="lg" data-bs-theme="dark" bg="dark" className="bg-body-dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#" style={{ width: '100px' }}>
            <img src={netflixLogo} alt="netflix-logo" style={{ width: '100%' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link variant="dark" href="/">
                Home
              </Nav.Link>
              <Nav.Link variant="dark" href="/movies">
                Movies
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
