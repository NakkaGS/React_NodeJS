import React, { useState, useEffect } from 'react'

//React Redux
import {useDispatch, useSelector} from 'react-redux'

//Router Dom
import { useNavigate, Link } from 'react-router-dom'

//Components
import Loader from '../components/Loader' //to have the Spinner in the page
import Message from '../components/Message' //to have the Error in the page

//Actions
import { updateUserProfile, getUserDetails } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'

//Constants
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

//Boostrap Components
import { Button, Badge } from 'react-bootstrap'

function ProfileScreen() {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success: successUpdate } = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading, error, orders } = orderListMy

    const dispatch = useDispatch()

    const [name, setName] = useState( userInfo.name )
    const [email, setEmail] = useState( userInfo.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [message, setMessage] = useState('')

    const history = useNavigate()

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

      /////////
      useEffect(() => {
        if (!userInfo) {
          history('/login')
        } else {
            dispatch(listMyOrders())

            if(!userInfo || !userInfo.name || userInfo?._id !== userInfo?._id || successUpdate){ //that to get the data
              dispatch({ type: USER_UPDATE_PROFILE_RESET}) //it helps to not get the same profile as in Edit User Profile            

            } else { //after get the data it full fill the data with setName and setEmail
              setName(userInfo.name)
              setEmail(userInfo.email)
            }
        }
      }, [history, dispatch, userInfo, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Password do not match")
        } else {
            const user = {
                _id: userInfo._id,
                name: name,
                email: email,
                password: confirmPassword,
            };
              
            dispatch(updateUserProfile(user));
          }
    }

    return (
    <div>
        <div className="row d-flex justify-content-center">
                
            <div className="col-md-3 mt-5">
                <div className="card p-3">
                    <h4 className='text-center m-3'>Update</h4>
                    {message && <Message variant="danger">{message}</Message>}
                    <form onSubmit={submitHandler}>
                        <input type="text" placeholder='Name' className='form-control mt-2' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder='Email' className='form-control mt-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder='Password' className='form-control mt-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="text" placeholder='Confirm Password' className='form-control mt-2' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <div className="d-flex align-items-end flex-column">
                            <button type='submit' className='btn mt-3'>Update</button>
                        </div>
                    </form>
                    
                </div>
            </div>

            <div className="col-md-6 mt-5">
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

export default ProfileScreen