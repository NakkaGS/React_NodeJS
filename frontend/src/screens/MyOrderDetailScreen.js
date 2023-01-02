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

  useEffect (() => {
    if(!userInfo) {
      history('/login')
    } else {
      dispatch(myOrder(id))
      setDelivered(order.isDelivered)
    }
  }, [dispatch, history, id])

  return (
    <div className="container">
        <div className="row detail-head">
          <div className="col">
            <h3>Order <strong>#{order._id}</strong></h3>
            {order.isDelivered ? <Badge bg="success">Success</Badge> : <Badge bg="warning" text="dark"><storng>Not Delivered</storng></Badge>}
          </div>
          <div className="col head-left">

            <Form.Group className="orderhead" controlId="brand">
                <Form.Control
                  as='select'
                  value={delivered} //it must have the same name as in the database attribute
                  onChange={(e) => setDelivered(e.target.value)}>
                      <option value="false">Not Delivered</option>
                      <option value="true">Delivered</option>
                </Form.Control>

                <Button type="submit" varint='Primary'>
              Save
            </Button>
            </Form.Group>


          </div>
        </div>


    </div>
  )
}

export default MyOrderDetailScreen