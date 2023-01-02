import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from 'react-router-dom'

import { listMyOrders } from '../actions/orderActions'

import Loader from '../components/Loader' //to have the Spinner in the page
import Message from '../components/Message' //to have the Error in the page

//React Router Dom
import { Link } from 'react-router-dom'

//Boostrap Components
import { Button, Badge } from 'react-bootstrap'

function MyOrdersScreen() {

    let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading, error, orders } = orderListMy
    
    /////////
    useEffect(() => {
    if (!userInfo) {
        history('/login')
    } else {
        dispatch(listMyOrders())

    }
    }, [history, dispatch, userInfo]);

    
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <h2>My Orders</h2>

                    <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Transaction ID</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                        {loading ? <Loader /> //it is to create the loadin and error view 
                            : error ? <Message variant='danger'>{error}</Message>
                            : 
                            (orders?.map(order=> {
                                return (
                                    
                                        <tr key={order._id} className='cart-item'>

                                            <td>{order._id}</td>
                                            <td>{formatter.format(order.orderAmount)}</td>
                                            <td>{order.createdAt.substring(0,10)}</td>
                                            <td>{order.transactionId}</td>
                                            <td>{order.isDelivered ? <Badge bg="success">Success</Badge> : <Badge bg="warning" text="dark"><storng>Not Delivered</storng></Badge>}</td>
                                            <td>
                                            <Link to={`/myorders/${order._id}/`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </Link>

                                            {/* <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button> */}
                                    </td>

                                        </tr>
                                    
                                )
                            }))
                        }
                        </tbody>
                    </table>


                </div>
            </div>
        </div>
    )
}

export default MyOrdersScreen