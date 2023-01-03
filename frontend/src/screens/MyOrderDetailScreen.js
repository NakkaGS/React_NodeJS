import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from 'react-router-dom'

import { myOrder } from '../actions/orderActions'
//Boostrap Components
import { Button, Badge, Form } from 'react-bootstrap'

function MyOrderDetailScreen({ match }) {

  const[delivered,setDelivered] = useState(false)

  let history = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderMy = useSelector((state) => state.orderMy)
  const { loading, error, order  } = orderMy

  let { id } = useParams(match); //get the Product ID

  let shipping = order.shippingAddress
  

  let orderItems = order.orderItems

  console.log(order)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect (() => {
    if(!userInfo) {
      history('/login')
    } else {
      dispatch(myOrder(id))
      setDelivered(order.isDelivered)
    }
  }, [dispatch, history, id])

  return (
    <div>
      <section id="detail-head">
        <div className="container">

          <div className="row">
            <div className="detail-top">
              <p>Order <strong>#{order._id}</strong></p>
              <div className="detail-badge">
                {order.isDelivered ? <p className="success">Delivered</p> : <p className="warning">Not Delivered</p>}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="detail-bottom">
              <div className="detail-userdata">
                <div className="personal-data">
                  <h4>{userInfo.name}</h4>
                  <h5>{userInfo.email}</h5>
                </div>
                <div className="address">
                  <p><strong>Address: </strong>{shipping?.address}</p>
                  <p><strong>City: </strong>{shipping?.city} - {shipping?.country} </p>
                  <p><strong>Postal Code: </strong>{shipping?.postalCode}</p>
                  <p></p>
                </div>

              </div>
              <div className="detail-price">
                <pre>
                  <p><strong>Total Amount</strong></p>
                  <p>${order.orderAmount}</p>
                </pre>

              </div>
            </div>
          </div>
        </div>

      </section>
      <section id="detail-table">
      <div className='row justify-content-center text-center'>
                <div className='col-md-8'>
                    <h1 className='m-3'>My Order</h1>
                    <table className='table '>
                        <thead>
                            <tr>
                                <th><strong>Name</strong></th>
                                <th><strong>Price</strong></th>
                                <th><strong>Quantity</strong></th>
                                <th><strong>Total Price</strong></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orderItems?.map(item=> {
                                return (
                                    <tr key={item._id} className='cart-item'>
                                        <td>{item.name}</td>
                                        <td>{formatter.format(item.price)}</td>
                                        <td>{item.quantity}</td>
                                        <td>{formatter.format(item.quantity * item.price)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>


                    </table>

                        

                </div>
            </div>
      </section>
    </div>
  )
}

export default MyOrderDetailScreen