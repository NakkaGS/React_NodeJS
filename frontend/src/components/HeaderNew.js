import React, { useState } from 'react'

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
        <div className="header-main">
            <div className="container">
                <a href="/" className='logo-title'>
                    <img src="/images/MERN_Logo.svg" alt="" height={80}/>
                </a>

                <div className="header-search-container">
                <input type="search" name="search" className="search-field" placeholder="Enter your product name..." value={searchKey} onChange={(e) => setSearchKey(e.target.value)} ></input>
                <button className="search-btn" onClick={() => {dispatch(filterProducts(searchKey, sort, category)) }}>
                    <ion-icon name="search-outline" role="img" className="md hydrated" aria-label="search outline"></ion-icon>
                </button>
                </div>

                <div className="header-user-actions">
                    <button className="action-btn dropdown-menu-header">
                        {userInfo ? (
                                <><ion-icon name="person-outline" role="img" class="md hydrated" aria-label="person outline"></ion-icon><ul className="dropdown-list">

                                    <li className="dropdown-item">
                                        <a href="/profile">Profile</a>
                                    </li>

                                    <li className="dropdown-item">
                                        <a href="#">Product List</a>
                                    </li>

                                    <li className="dropdown-item">
                                        <a href="/product/create">Create Product</a>
                                    </li>
                                    
                                    <li className="dropdown-item">
                                        <a href="/category">Category List</a>
                                    </li>

                                    <li className="dropdown-item">
                                        <a onClick={logoutHandler}>Logout</a>
                                    </li>

                                </ul></>

                            ) : (
                                <a href='/login'><ion-icon name="person-outline" role="img" class="md hydrated" aria-label="person outline"></ion-icon></a>
                            )}
                    </button>
                
                    <Link to={`/cart`}>

                    <button className="action-btn">
                        <ion-icon name="bag-handle-outline" role="img" class="md hydrated" aria-label="bag handle outline"></ion-icon>
                        <span className="count">{(typeof(cartItems) !== "undefined") && cartItems.length}</span>
                    </button>
                    
                    </Link>

                </div>

            </div>
        </div>
    )
}

export default HeaderNew