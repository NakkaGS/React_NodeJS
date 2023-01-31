import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_CREATE_FAIL,
    PRODUCT_REVIEW_CREATE_RESET,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CATEGORY_REQUEST,
    PRODUCT_CATEGORY_SUCCESS,
    PRODUCT_CATEGORY_FAIL,   

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET, 

} from '../constants/productConstants' //it is like enum in C

//////////////////////////////////////////////
export const productListReducer = (state = { products:[]}, action ) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST: //it set the state loading to true and clear all the products
            return {loading: true, products: []}
        
        case PRODUCT_LIST_SUCCESS: //if the connection is OK, it gets all the product and reset the loading 
            return {loading: false, products: action.payload}

        case PRODUCT_LIST_FAIL: //is there is a error, it calls this case
            return {loading: false, error: action.payload}
        
        default:
            return state;
    }
}

//////////////////////////////////////////////
export const productCategoryReducer = (state = { products:[]}, action ) => {
    switch(action.type){
        case PRODUCT_CATEGORY_REQUEST: //it set the state loading to true and clear all the products
            return {loading: true, products: []}
        
        case PRODUCT_CATEGORY_SUCCESS: //if the connection is OK, it gets all the product and reset the loading 
            return {loading: false, products: action.payload}

        case PRODUCT_CATEGORY_FAIL: //is there is a error, it calls this case
            return {loading: false, error: action.payload}
        
        default:
            return state;
    }
}

//////////////////////////////////////////////
export const productDetailsReducer = (state = { product:{} }, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state} //"...state"can only make copies of the original values, and then they can modify the copies.
        
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return state;
    }
}

//////////////////////////////////////////////
export const productCreateReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }

        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }

        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_CREATE_RESET:
            return { }

        default:
            return state;
    }       
}

//////////////////////////////////////////////
export const reviewCreateReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_REVIEW_CREATE_REQUEST:
            return { loading: true }

        case PRODUCT_REVIEW_CREATE_SUCCESS:
            return { loading: false, success: true}

        case PRODUCT_REVIEW_CREATE_FAIL:
            return { loading: false, error: action.payload}

        case PRODUCT_REVIEW_CREATE_RESET:
            return { }

        default:
            return state
    }
}

//////////////////////////////////////////////
export const productDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }

        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true}

        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload}

        default:
            return state
    }
}

//////////////////////////////////////////////
export const productUpdateReducer = (state = { product: {} }, action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true}

        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }

        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_UPDATE_RESET:
            return { product: {} }

        default:
            return state;
    }       
}


