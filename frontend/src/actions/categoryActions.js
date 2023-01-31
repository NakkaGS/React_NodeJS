import axios from 'axios'

import { 
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,

    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,

    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,

    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_RESET,

} from '../constants/categoryConstants' //it is like enum in C


//////////////////////////////////////////////
export const listCategories = () => async (dispatch) => { //it is a action
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST })
            const { data } = await axios.get(`/api/categories/getallcategories`)
            //console.log(data)

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.detail //if there a detail it show the detail, otherwise it shows the message set in 
                ? error.response.data.detail 
                : error.message,
        })
    }
}

//////////////////////////////////////////////
export const createCategory = (categoryCreate) => async(dispatch) => {
    try {
        dispatch({
            type: CATEGORY_CREATE_REQUEST,
        })
        //console.log(productCreate)

        const config = {
            headers: { //It just worked like this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }

        //in the backend, there is a url (API) that it gets the data from the user
        const { data } = await axios.post(
            `/api/categories/addcategory/`,
            { category: categoryCreate }, //post needs to send something
            config
        )

        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


//////////////////////////////////////////////
export const getCategoryDetails = (id) => async (dispatch) => { //it is a action
    //console.log(id)

    try {
        const config = {
            headers: { //It just worked like this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }

        dispatch({ type: CATEGORY_DETAILS_REQUEST })
        
        const { data } = await axios.post(
            '/api/categories/getcategorybyid/', 
            { categoryid: id },
            config
        )  

        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//////////////////////////////////////////////
export const updateCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_UPDATE_REQUEST
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
            `/api/categories/update/`,   
            category,
            config
        )

        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}