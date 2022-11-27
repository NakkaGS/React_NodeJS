import React from 'react'

//Router
import { LinkContainer } from "react-router-bootstrap";

//Boostrap Components
import { Navbar, Nav, Container, Button, ButtonGroup } from "react-bootstrap"; //installed using the console


function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="">MERN</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#cart">Cart</Nav.Link>
            <Nav.Link href="#product">Product</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header