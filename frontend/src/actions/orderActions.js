import axios from 'axios'

import { PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, PLACE_ORDER_FAIL } from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const placeOrder = (amount) => async (dispatch, getState) => {

    const currentUser = getState().userLogin.userInfo
    const cartItems = getState().cart.cartItems
    
    try {
        const config = {
            headers: { //It just worked slike this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        dispatch({type: PLACE_ORDER_REQUEST})

        const { data } = await axios.post(
            '/api/orders/placeorder', 
            { amount: amount, currentUser: currentUser, cartItems: cartItems},
            config
        ).then((response) => {
            if (response.data.url) {
              window.location.href = response.data.url;
            }
          })
          .catch((err) => console.log(err.message));

        dispatch({
            type: PLACE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}

export const paymentSuccess = () => (dispatch) => {
    localStorage.removeItem('cartItems')
    dispatch({type: CART_CLEAR_ITEMS})
}