import React from 'react'

//React-Redux
import { useDispatch } from 'react-redux'

//Component
import Loader from '../components/Loader' //to have the Spinner in the page

//Actions
import { placeOrder } from '../actions/orderActions'

//Stripe
import StripeCheckout from 'react-stripe-checkout'

function CheckOut({ amount }) {

  const dispatch = useDispatch()

  function tokenHandler(token) {
    console.log(token)
    dispatch(placeOrder(token, amount))
    
  }

  return (
    <div>
      {process.env.REACT_APP_STRIPE_KEY === undefined ? (
        <Loader />
      ) : (
        <StripeCheckout
        token={tokenHandler}
        amount={amount}
        shippingAddress
        currency='EUR'
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
            <button className='light'>Pay</button>

        </StripeCheckout>
      )}

    </div>
  )
}

export default CheckOut