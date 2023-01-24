import axios from 'axios'

import {    
    PLACE_ORDER_REQUEST, 
    PLACE_ORDER_SUCCESS, 
    PLACE_ORDER_FAIL,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,

    ORDER_MY_REQUEST,
    ORDER_MY_SUCCESS,
    ORDER_MY_FAIL,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

} from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

//////////////////////////////////////////////
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

//////////////////////////////////////////////
export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const {
            userLogin: { userInfo }, //that is to get the token
        } = getState()

        //Huge Problem with the orderItem was because it must be "Content-Type": "application/json", in orderActions
        const config = {
            headers: { 
                'Content-type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        }

        const { data } = await axios.post(
            `/api/orders/myorders/`,
            { userid: userInfo?._id },
            config
        )

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//////////////////////////////////////////////
export const myOrder = (orderID) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_MY_REQUEST
        })

        const {
            userLogin: { userInfo }, //that is to get the token
        } = getState()

        //Huge Problem with the orderItem was because it must be "Content-Type": "application/json", in orderActions
        const config = {
            headers: { 
                'Content-type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        }

        const { data } = await axios.post ('/api/orders/myorderbyid',
            {orderid: orderID},
            config
        )

        dispatch ({
            type: ORDER_MY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

//////////////////////////////////////////////
export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })

        const {
            userLogin: { userInfo }, //that is to get the token
        } = getState()

        //Huge Problem with the orderItem was because it must be "Content-Type": "application/json", in orderActions
        const config = {
            headers: { 
                'Content-type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/allorders/`,
            config
        )

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}