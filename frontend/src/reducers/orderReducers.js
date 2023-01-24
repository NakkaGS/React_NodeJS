import {    
    PLACE_ORDER_REQUEST, 
    PLACE_ORDER_SUCCESS, 
    PLACE_ORDER_FAIL,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,

    ORDER_MY_REQUEST,
    ORDER_MY_SUCCESS,
    ORDER_MY_FAIL,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

} from '../constants/orderConstants'

//////////////////////////////////////////////
export const placeOrderReducer = (state = { }, action) => {
    switch(action.type){
        case PLACE_ORDER_REQUEST:
            return { loading: true, ...state } //"...state"can only make copies of the original values, and then they can modify the copies.
        
        case PLACE_ORDER_SUCCESS:
            return { loading: false, success: true, ...state }

        case PLACE_ORDER_FAIL:
            return { loading: false, error: action.payload, ...state }
        
        default:
            return state;
    }
}

//////////////////////////////////////////////
export const orderListMyReducer = (state = { loading: false, orders:[] }, action) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return { loading: true }

        case ORDER_LIST_MY_SUCCESS:
            return { loading: false, orders: action.payload }

        case ORDER_LIST_MY_FAIL:
            return { loading: false, error: action.payload }

        case ORDER_LIST_MY_RESET:
            return { order: [] }//reset the order state (redux)

        default:
            return state
    }
}

//////////////////////////////////////////////
export const orderListReducer = (state = { loading: false, orders:[] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true }

        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload }

        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

//////////////////////////////////////////////
export const orderMyReducer = (state = { order: [] }, action) => {
    switch(action.type) {
        case ORDER_MY_REQUEST:
            return { loading: true, ...state, order: [] }

        case ORDER_MY_SUCCESS:
            return { loading: false, order: action.payload }
        
        case ORDER_MY_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}