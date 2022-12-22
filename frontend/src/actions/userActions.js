import axios from 'axios'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

import { CREATE_USER_REQUEST, 
    CREATE_USER_SUCCESS, 
    CREATE_USER_FAIL,

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

} from '../constants/userConstants'

export const registerNewUser = (user) => async (dispatch) => {

    try {
        dispatch({
            type: CREATE_USER_REQUEST,
        })

        const config = {
            headers: { //It just worked like this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }

        //in the backend, there is a url (API) that it gets the data from the user
        await axios.post(
            `/api/users/register/`, 
            {user : user},
            config,
        )

        dispatch({
            type: CREATE_USER_SUCCESS,

        })
        
    } catch (error) {

        console.log(error)
        dispatch({
            type: CREATE_USER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }    
}

export const loginUser = (user) => async (dispatch, getState) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: { //It just worked like this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }

        //in the backend, there is a url (API) that it gets the data from the user
        const { data } = await axios.post(
            `/api/users/login/`, 
            {user : user},
            config,
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(getState().userLogin.userInfo))
        
    } catch (error) {

        console.log(error)
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }    
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')

    dispatch({type: USER_LOGOUT})
    dispatch({type: CART_CLEAR_ITEMS})
}