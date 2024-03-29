import axios from 'axios'

import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_CATEGORY_REQUEST,
    PRODUCT_CATEGORY_SUCCESS,
    PRODUCT_CATEGORY_FAIL,   
    
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_CREATE_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET, 


} from '../constants/productConstants' //it is like enum in C

//it works like a state machine
//////////////////////////////////////////////
export const listProducts = () => async (dispatch) => { //it is a action
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
            const { data } = await axios.get(`/api/products/getallproducts`)
            //console.log(data)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail //if there a detail it show the detail, otherwise it shows the message set in 
                ? error.response.data.detail 
                : error.message,
        })
    }
}

//////////////////////////////////////////////
export const listProductDetails = (id) => async (dispatch) => { //it is a action
    //console.log(id)

    try {
        const config = {
            headers: { //It just worked like this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }

        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        
        const { data } = await axios.post(
            '/api/products/getproductbyid', 
            { productid: id },
            config
        )  

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//////////////////////////////////////////////
export const categoryProducts = (category) => async (dispatch) => { //it is a action
    //console.log(id)

    try {
        const config = {
            headers: { //It just worked like this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }

        dispatch({ type: PRODUCT_CATEGORY_REQUEST })
        
        const { data } = await axios.post(
            '/api/products/productsbycategory', 
            { categoryName: category },
            config
        )  

        dispatch({
            type: PRODUCT_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CATEGORY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//////////////////////////////////////////////
export const createProduct = (productCreate) => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })
        //console.log(productCreate)

        const config = {
            headers: { //It just worked like this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }

        //in the backend, there is a url (API) that it gets the data from the user
        const { data } = await axios.post(
            `/api/products/create/`,
            { product: productCreate }, //post needs to send something
            config
        )

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//////////////////////////////////////////////
export const filterProducts = (searchKey, sortKey, category) => async dispatch => {
    try {

        dispatch({ type: PRODUCT_LIST_REQUEST })
            const { data } = await axios.get(`/api/products/getallproducts`)
            //console.log(data)
            var filteredProducts = data;

        if(searchKey !== undefined && searchKey){
            filteredProducts = data.filter(product => { return product.name.toLowerCase().includes(searchKey) })
        }

        if(sortKey !== 'popular'){
            if (sortKey ==='htl'){
                filteredProducts = data.sort((a,b) => {
                    return -a.price + b.price
                })
            } else {
                filteredProducts = data.sort((a,b) => {
                    return a.price + -b.price
                })
            }
        }

        if(category !== 'all'){
            filteredProducts = data.filter(product => { return product.category.name.toLowerCase().includes(category.toLowerCase()) })
        }

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: filteredProducts
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail //if there a detail it show the detail, otherwise it shows the message set in 
                ? error.response.data.detail 
                : error.message,
        })
    }
}

//////////////////////////////////////////////
export const addProductReview = (review, productId) => async (dispatch, getState) => {

    try{
        dispatch({
            type: PRODUCT_REVIEW_CREATE_REQUEST
        })
    
        const config = {
            headers: { //It just worked like this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
    
        const currentUser = getState().userLogin.userInfo

        if(!currentUser) {
            console.log('It must be logged')
        } else {
            const { data } = await axios.post('/api/products/addreview', {review, productId, currentUser}, config)
    
            dispatch({type: PRODUCT_REVIEW_CREATE_SUCCESS})
        }

    } catch (error) {

        dispatch({
            type: PRODUCT_REVIEW_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.message.data.detail
                : error.message,
        })
    }

}

//////////////////////////////////////////////
export const deleteProduct = (productId) => async (dispatch, getState) => {
    try {

        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })
    
        const config = {
            headers: { //It just worked like this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
    
        const currentUser = getState().userLogin.userInfo

        if(!currentUser) {
            console.log('It must be logged')
        } else {
            const { data } = await axios.post('/api/products/delete', {productId}, config)
    
            dispatch({type: PRODUCT_DELETE_SUCCESS})
        }

    } catch (error) {

        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.message.data.detail
                : error.message,
        })
    }
}

//////////////////////////////////////////////
export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
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
            `/api/products/update/`,   
            product,
            config
        )

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}