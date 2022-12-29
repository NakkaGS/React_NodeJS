import React, { useState, useEffect } from 'react'

//React-Redux
import { useDispatch } from 'react-redux'

//Component
import Loader from '../components/Loader' //to have the Spinner in the page

//Actions
import { placeOrder } from '../actions/orderActions'

//Router
import { useNavigate, Link } from "react-router-dom";

function CheckOut({ total }) {

  const dispatch = useDispatch()
  let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

  const userInfo =  localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  const cartItem =  localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : null

  function payHandler(total) {
    if(userInfo){
      dispatch(placeOrder(total))
    }
  }

  const clickHandler = (e) => {
    e.preventDefault()
    if (!userInfo) {
      history('/login')
    } 
  }

  return (
    <div>
      {process.env.REACT_APP_STRIPE_KEY === undefined ? <Loader />
       : (userInfo === null || cartItem === null) ?
       <button className='light' onClick={ clickHandler }>Pay</button>
        :  <button className='light' onClick={() => payHandler()}>Pay</button>
      }

    </div>
  )
}

export default CheckOut