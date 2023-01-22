import { 
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,

} from '../constants/categoryConstants' //it is like enum in C

//////////////////////////////////////////////
export const categoryListReducer = (state = { categories:[]}, action ) => {
    switch(action.type){
        case CATEGORY_LIST_REQUEST: //it set the state loading to true and clear all the products
            return {loading: true, categories: []}
        
        case CATEGORY_LIST_SUCCESS: //if the connection is OK, it gets all the product and reset the loading 
            return {loading: false, categories: action.payload}

        case CATEGORY_LIST_FAIL: //is there is a error, it calls this case
            return {loading: false, error: action.payload}
        
        default:
            return state;
    }
}