import axios from "axios";

import { 
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,

} from '../constants/cartConstants'

export const addToCart = (product, qty) => async (dispatch,getState) => { //it is a action

    const cartItem = {
        name : product.name,
        _id: product._id,
        price : product.price,
        countInStock : product.countInStock,
        quantity : Number(qty) 
    }
    
    dispatch({
        type: CART_ADD_ITEM,
        payload: cartItem
        }
    )

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}