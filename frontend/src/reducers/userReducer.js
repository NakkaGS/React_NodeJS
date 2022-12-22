import { CREATE_USER_REQUEST, 
        CREATE_USER_SUCCESS, 
        CREATE_USER_FAIL,
    
        USER_LOGIN_REQUEST,
        USER_LOGIN_SUCCESS,
        USER_LOGIN_FAIL,
        USER_LOGOUT,
    
    } from '../constants/userConstants'

export const userRegisterReducer = ( state={} , action )=> {
    switch(action.type){
        case CREATE_USER_REQUEST:
            return {
                ...state, 
                loading: true
            }
        
        case CREATE_USER_SUCCESS:
            return{
                loading: false,
                sucess: true,
                userInfo: action.payload,
            }

        case CREATE_USER_FAIL:
            return{
                loading: false,
                error: 'User Already Registered'
            }

        default:
            return state;
    }
}

export const userLoginReducer = ( state = { } , action ) => {
    switch(action.type){

        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }

        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
                return {}

        default:
            return state;
    }


}