import React, { useEffect } from 'react'

import { useDispatch } from "react-redux";

import { paymentSuccess } from '../actions/orderActions'

function PaymentSuccess() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(paymentSuccess());
  })
  
  return (
    <div className='text-center'>
      <h1 className='text-center mt-5'>Payment Success</h1>
      <p>Your order might take some time to process.</p>
      <p>Check your order status at your profile after about 10mins.</p>


    </div>
  )
}

export default PaymentSuccess