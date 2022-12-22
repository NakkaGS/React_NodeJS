import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAIL } from '../constants/userConstants'

export const registerNewUserReducer = ( state={} , action )=> {
    switch(action.type){
        case CREATE_USER_REQUEST:
            return {
                ...state, 
                loading: true
            }
        
        case CREATE_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                sucess: true,
                userInfo: action.payload,
            }

        case CREATE_USER_FAIL:
            return{
                ...state, 
                loading: true,
                error: 'User Already Registered'
            }

        default:
            return state;
    }
}