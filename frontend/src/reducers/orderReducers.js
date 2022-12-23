import { PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, PLACE_ORDER_FAIL } from '../constants/orderConstants'

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