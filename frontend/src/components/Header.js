import React from 'react'

import { Navbar, Nav, Container, Button, ButtonGroup } from "react-bootstrap"; //installed using the console


function Header() {
  return (
    <header>
      <Navbar bg="warning" variant="dark" expand="lg" collapseOnSelect>
        <Container>

          <Navbar.Brand>ProShop</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

            <ButtonGroup className="me-2" aria-label="First group" >
              <Button variant="light">Cart</Button> 
              <Button variant="light">Product</Button>
            </ButtonGroup>

            </Nav>

            
          </Navbar.Collapse>
        </Container>


      </Navbar>
    </header>
  )
}

export default Header