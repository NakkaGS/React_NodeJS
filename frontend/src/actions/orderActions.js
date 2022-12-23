import axios from 'axios'

import { PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, PLACE_ORDER_FAIL } from '../constants/orderConstants'

export const placeOrder = (token, amount) => async (dispatch, getState) => {

    const currentUser = getState().userLogin.userInfo
    const cartItems = getState().cart.cartItems
    console.log(token) 
    
    try {
        dispatch({type: PLACE_ORDER_REQUEST})

        const config = {
            headers: { //It just worked like this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }

        const { data } = await axios.post(
            '/api/orders/placeorder', 
            { token, amount, currentUser, cartItems},
            config
        ) 
        console.log(data)

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