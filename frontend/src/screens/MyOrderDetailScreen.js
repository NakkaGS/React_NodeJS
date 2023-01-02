import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from 'react-router-dom'

import { myOrder } from '../actions/orderActions'

function MyOrderDetailScreen({ match }) {

  let history = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderMy = useSelector((state) => state.orderMy)
  const { loading, error, order  } = orderMy



  let { id } = useParams(match); //get the Product ID

  useEffect (() => {
    if(!userInfo) {
      history('/login')
    } else {
      dispatch(myOrder(id))

      console.log(order[0])
    }
  }, [dispatch, history, id])

  return (
    <div>
      <div className="orderhead">
        <div className="row">
          <div className="col">
            <h2>Order # </h2>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MyOrderDetailScreen