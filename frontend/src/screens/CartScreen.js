import React from 'react'

//Redux
import { useSelector, useDispatch } from 'react-redux'

//Actions
import { addToCart, deleteFromCart } from '../actions/cartActions' //this is the reducer

function CartScreen() {
    
    const cart = useSelector(state=>state.cart)
    const { cartItems } = cart

    const dispatch = useDispatch()

    var subtotal = cartItems?.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    return (
        <div>
            <div className='row justify-content-center text-center'>
                <div className='col-md-8'>
                    <h1 className='m-5'>My Cart</h1>
                    <table className='table table-bordered '>
                        <thead>
                            <tr>
                                <th><strong>Name</strong></th>
                                <th><strong>Price</strong></th>
                                <th><strong>Quantity</strong></th>
                                <th><strong>Total Price</strong></th>
                                <th><strong>Delete</strong></th>
                            </tr>
                        </thead>

                        <tbody>
                            {cartItems?.map(item=> {
                                return (
                                    <tr key={item._id} >
                                        <td>{item.name}</td>
                                        <td>{formatter.format(item.price)}</td>
                                        <td><select value={item.quantity} onChange={(e)=>{dispatch(addToCart(item, e.target.value))}}>
                                            {[...Array(item.countInStock).keys()].map((x,i)=>{
                                                return <option value={i+1}>{i+1}</option>
                                            })}
                                            </select></td>
                                        <td>{formatter.format(item.quantity * item.price)}</td>
                                        <td><i role="button" className='far fa-trash-alt' onClick={()=>{dispatch(deleteFromCart(item))}}></i></td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>

                    <hr/>
                    <h3 className='m-3'>Subtotal: {typeof(subtotal) !== "undefined" ? (formatter.format(subtotal)) : "$0" }</h3>
                    
                    <hr/>
                        <button className='light'>Pay</button>

                </div>
            </div>
        </div>
    )
}

export default CartScreen