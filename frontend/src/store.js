import { createStore , combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {    productListReducer, 
            productDetailsReducer, 
            productCreateReducer,
            productDeleteReducer,

            reviewCreateReducer } from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'

import { userRegisterReducer, userLoginReducer, userUpdateProfileReducer, userDetailsReducer } from './reducers/userReducer'

import { placeOrderReducer, orderListMyReducer, orderMyReducer } from './reducers/orderReducers'

//every time that one of the items on the left is call (in the screen, component), it calls the reducer 
const reducer = combineReducers({
    
    productList : productListReducer,
    productDetails : productDetailsReducer,
    productCreate : productCreateReducer,
    productDelete : productDeleteReducer,
    reviewCreate : reviewCreateReducer,
    
    cart: cartReducer,

    userRegister : userRegisterReducer,
    userLogin : userLoginReducer,
    userUpdateProfile : userUpdateProfileReducer,
    userDetails : userDetailsReducer,
    
    placeOrder : placeOrderReducer,
    orderListMy : orderListMyReducer, //orders from the logged user
    orderMy : orderMyReducer,

})

const cartItemsFromStorage =  localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const currentUser =  localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart : {cartItems: cartItemsFromStorage},
    userLogin : {userInfo: currentUser}
}

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(thunk))) //createStore is not been used anymore

export default store