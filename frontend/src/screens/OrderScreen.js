import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from 'react-router-dom'

import { listMyOrders } from '../actions/orderActions'

function OrderScreen() {

    let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
    
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
                            {orders?.map(order=> {
                                return (
                                    <tr key={order._id} className='cart-item'>
                                        <td>{order._id}</td>
                                        <td>{formatter.format(order.orderAmount)}</td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.transactionId}</td>
                                        <td>{order.isDelivered ? "Delivered" : "Not Delivered"}</td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>


                </div>
            </div>
        </div>
    )
}

export default OrderScreen