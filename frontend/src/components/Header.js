import React from 'react'


//Boostrap Components
import { Navbar, Nav, Container, Badge } from "react-bootstrap"; //installed using the console

import { useSelector } from 'react-redux'


function Header() {

  const cart = useSelector(state=>state.cart)
  const { cartItems } = cart

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">MERN</Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/product/create">Create Product</Nav.Link>
          </Nav>

          <Nav className="float-end">
            <Nav.Link href='/login'>Login</Nav.Link>
            <Nav.Link href='/cart'>
              <i className="fas fa-shopping-cart"></i> Cart <Badge pill bg="light" text="dark">{cartItems.length}</Badge>
            </Nav.Link>
            </Nav>
          
        </Container>
      </Navbar>
    </header>
  )
}

export default Header