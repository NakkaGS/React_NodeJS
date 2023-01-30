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
        USER_DETAILS_RESET,

        USER_LIST_REQUEST,
        USER_LIST_SUCCESS,
        USER_LIST_FAIL,

        USER_UPDATE_REQUEST,
        USER_UPDATE_SUCCESS,
        USER_UPDATE_FAIL,
        USER_UPDATE_RESET,
    
    } from '../constants/userConstants'

//////////////////////////////////////////////
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

//////////////////////////////////////////////
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

//////////////////////////////////////////////
export const userDetailsReducer = ( state = {} , action ) => {
    switch(action.type){
        

        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }

        case USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

//////////////////////////////////////////////
export const userListReducer = ( state = { users: [] } , action ) => {
    switch(action.type){

        case USER_LIST_REQUEST:
            return {
                loading: true, 
                ...state,
                users: []
            }
        
        case USER_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }

        case USER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

//////////////////////////////////////////////
export const userUpdateProfileReducer = ( state = { success: false, user:{} }, action ) => {
    switch(action.type){

        case USER_UPDATE_PROFILE_REQUEST:
            return {
                loading: true,
            }
        
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        
        case USER_UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_UPDATE_PROFILE_RESET:
            return { user: {} }

        default:
            return state
    }
}

//////////////////////////////////////////////
export const userUpdateReducer = ( state = { success: false, user:{} }, action ) => {
    switch(action.type){

        case USER_UPDATE_REQUEST:
            return {
                loading: true,
            }
        
        case USER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        
        case USER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_UPDATE_RESET:
            return { user: {} }

        default:
            return state
    }
}