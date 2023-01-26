import React from 'react'

//Redux
import { useSelector, useDispatch } from 'react-redux'

//Actions
import { addToCart, deleteFromCart } from '../actions/cartActions' //this is the reducer

import CheckOut from '../components/CheckOut'

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
        <div className='cart'>
            <div className='container'>
                    <h2 className='cart-title'>My Cart</h2>
                    <table className='table'>
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
                                    <tr key={item._id} className='cart-item'>
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

                    <h3 className='cart-subtotal'>Subtotal: {typeof(subtotal) !== "undefined" ? (formatter.format(subtotal)) : "$0" }</h3>
                    
                    <hr/>
                    <div className='d-flex justify-content-center'>
                        <CheckOut amount={ subtotal }/>
                    </div>
                    
            </div>
        </div>
    )
}

export default CartScreen