import React, { useState, useEffect } from 'react'

//React-Redux
import { useDispatch } from 'react-redux'

//Component
import Loader from '../components/Loader' //to have the Spinner in the page

//Actions
import { placeOrder } from '../actions/orderActions'

//Stripe
import StripeCheckout from 'react-stripe-checkout'

//Router
import { useNavigate, Link } from "react-router-dom";

function CheckOut({ amount }) {

  const dispatch = useDispatch()
  let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

  const userInfo =  localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

  function tokenHandler(token, userInfo) {
    if(userInfo){
      dispatch(placeOrder(token, amount))
    }
  }

  const ClickHandler = (e) => {
    e.preventDefault()
    if (!userInfo) {
      history('/login')
    } 
  }

  return (
    <div>
      {process.env.REACT_APP_STRIPE_KEY === undefined ? <Loader />
       : userInfo === null ?
       <button className='light' onClick={ClickHandler}>Pay</button>
        :  <StripeCheckout
            token={tokenHandler}
            amount={amount}
            shippingAddress
            currency='EUR'
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
>
                <button className='light'>Pay</button>

            </StripeCheckout>
      }

    </div>
  )
}

export default CheckOut