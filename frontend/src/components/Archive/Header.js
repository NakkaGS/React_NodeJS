import React from 'react'

//Boostrap Components
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap"; //installed using the console

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Actions
import { logout } from '../../actions/userActions'

function Header() {

  const cart = useSelector(state=>state.cart)
  const { cartItems } = cart

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = (e) => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">MERN</Navbar.Brand>

          <Nav className="float-end">
            <Nav.Link href='/cart'>
                <i className="fas fa-shopping-cart"></i> <Badge pill bg="light" text="dark">
                {(typeof(cartItems) !== "undefined") && cartItems.length}</Badge>
            </Nav.Link>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                {/* <NavDropdown.Item href="/myorders">My Orders</NavDropdown.Item> */}
                <NavDropdown.Item href="/product/create">Create Product</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (

                <Nav.Link href='/login'>Login</Nav.Link>
            )}

          </Nav>
          
        </Container>
      </Navbar>
    </header>
  )
}

export default Header