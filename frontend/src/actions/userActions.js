import axios from 'axios'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

import { CREATE_USER_REQUEST, 
    CREATE_USER_SUCCESS, 
    CREATE_USER_FAIL,

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

} from '../constants/userConstants'

//////////////////////////////////////////////
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

        dispatch({
            type: CREATE_USER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }    
}

//////////////////////////////////////////////
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

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }    
}

//////////////////////////////////////////////
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')

    dispatch({type: USER_LOGOUT})
    dispatch({type: CART_CLEAR_ITEMS})
}

//////////////////////////////////////////////
export const getUserDetails = (id) => async (dispatch) => { //it is a action
    //console.log(id)

    try {
        const config = {
            headers: { //It just worked like this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }

        dispatch({ type: USER_DETAILS_REQUEST })
        
        const { user } = await axios.post(
            '/api/users/getuserbyid', 
            { userid: id },
            config
        )  

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: user
        })

        

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//////////////////////////////////////////////
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {
            userDetails: { userInfo },
        } = getState()

        const config = {
            headers: { //It just worked like this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${userInfo?.token}`,
            }
        }

        const { data } = await axios.put(
            `/api/users/profile/update/`,   
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        //itn writes the Data into the localStorage
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

