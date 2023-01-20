import React, { useState } from 'react'

//Boostrap Components
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap"; //installed using the console

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Actions
import { logout } from '../actions/userActions'

//Actions
import { filterProducts } from '../actions/productActions'

//React Router Dom
import { Link } from 'react-router-dom'

function HeaderNew() {

    const [searchKey, setSearchKey] = useState('')
    const [sort, setSort] = useState('popular')
    const [category, setCategory] = useState('all')

    const cart = useSelector(state=>state.cart)
    const { cartItems } = cart
  
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
  
    const dispatch = useDispatch()
  
    const logoutHandler = (e) => {
      dispatch(logout())
    }

    return (
        <div class="header-main">
            <div class="container">
                <a href="/" class='logo-title'>
                    <img src="./images/MERN_logo.svg" alt="" height={80}/>
                </a>

                <div class="header-search-container">
                <input type="search" name="search" class="search-field" placeholder="Enter your product name..." value={searchKey} onChange={(e) => setSearchKey(e.target.value)} ></input>
                <button class="search-btn" onClick={() => {dispatch(filterProducts(searchKey, sort, category)) }}>
                    <ion-icon name="search-outline" role="img" class="md hydrated" aria-label="search outline"></ion-icon>
                </button>
                </div>

                <div class="header-user-actions">
                <button class="action-btn dropdown-menu-header">
                    <ion-icon name="person-outline" role="img" class="md hydrated" aria-label="person outline"></ion-icon>
                    {userInfo ? (
                        <NavDropdown>
                            <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                            {/* <NavDropdown.Item href="/myorders">My Orders</NavDropdown.Item> */}
                            <NavDropdown.Item href="/product/create">Create Product</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        ) : (
                            <Nav.Link href='/login'>Login</Nav.Link>
                        )}
                </button>
                
                <Link to={`/cart`}>

                <button class="action-btn">
                    <ion-icon name="bag-handle-outline" role="img" class="md hydrated" aria-label="bag handle outline"></ion-icon>
                    <span class="count">{(typeof(cartItems) !== "undefined") && cartItems.length}</span>
                </button>
                    
                </Link>

                </div>

            </div>
        </div>
    )
}

export default HeaderNew